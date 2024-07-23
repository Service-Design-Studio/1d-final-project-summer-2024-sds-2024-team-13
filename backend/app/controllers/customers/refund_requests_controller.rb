# app/controllers/customers/refund_requests_controller.rb
class Customers::RefundRequestsController < ApplicationController
  before_action :set_customer
  before_action :set_refund_request, only: [:update_status]

  def index
    @refund_requests = @customer.sent_refund_requests
    render json: @refund_requests
  end

  def create
    @refund_request = RefundRequest.new(refund_request_params)
    @refund_request.sender = @customer
    @refund_request.recipient = determine_recipient_from_params

    if @refund_request.save
      render json: { status: 'Refund request created successfully', refund_request: @refund_request }, status: :created
    else
      render json: { errors: @refund_request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_status
    if @refund_request.recipient == @customer
      if @refund_request.update(status: params[:status])
        render json: { status: 'Refund request status updated successfully', refund_request: @refund_request }, status: :ok
      else
        render json: { errors: @refund_request.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'You are not authorized to update this refund request' }, status: :forbidden
    end
  end
  
  def destroy
    if current_user == @refund_request.sender
      @refund_request.destroy
      render json: { status: 'Refund request deleted successfully' }, status: :ok
    else
      render json: { error: 'You are not authorized to delete this refund request' }, status: :forbidden
    end
  end
  
  private

  def set_customer
    @customer = Customer.find(params[:customer_id])
  end

  def set_refund_request
    @refund_request = RefundRequest.find(params[:id])
  end

  def refund_request_params
    params.require(:refund_request).permit(:transaction_id, :status, :expected_amount, :refund_amount)
  end

  def determine_recipient_from_params
    recipient_id = params[:recipient_id]
    if User.exists?(recipient_id)
      User.find(recipient_id)
    elsif Customer.exists?(recipient_id)
      Customer.find(recipient_id)
    else
      render json: { error: 'Recipient not found' }, status: :not_found
    end
  end
end


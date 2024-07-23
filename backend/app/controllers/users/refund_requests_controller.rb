# app/controllers/users/refund_requests_controller.rb
class Users::RefundRequestsController < ApplicationController
  before_action :set_user
  before_action :set_refund_request, only: [:update_status]

  def index
    @refund_requests = @user.sent_refund_requests
    render json: @refund_requests
  end

  def create
    @refund_request = RefundRequest.new(refund_request_params)
    @refund_request.sender = @user
    @refund_request.recipient = determine_recipient_from_params

    if @refund_request.save
      render json: { status: 'Refund request created successfully', refund_request: @refund_request }, status: :created
    else
      render json: { errors: @refund_request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_status
    if @refund_request.recipient == @user
      if @refund_request.update(status: params[:status])
        render json: { status: 'Refund request status updated successfully', refund_request: @refund_request }, status: :ok
      else
        render json: { errors: @refund_request.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: 'You are not authorized to update this refund request' }, status: :forbidden
    end
  end

  private

  def set_user
    @user = User.find(params[:user_id])
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

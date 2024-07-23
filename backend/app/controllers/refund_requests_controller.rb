class RefundRequestsController < ApplicationController
  before_action :set_refund_request, only: [:update_status, :destroy]

  def create
    @refund_request = RefundRequest.new(refund_request_params)
    sender = current_user  # Fetches the current logged-in user that creates the refund request
    @refund_request.sender = sender

    if @refund_request.save
      render json: { status: 'Refund request created successfully', refund_request: @refund_request }, status: :created
    else
      render json: { errors: @refund_request.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update_status
    if current_user == @refund_request.recipient
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

  def determine_recipient_from_transaction
    if @transaction.user_id
      User.find(@transaction.user_id)
    elsif @transaction.customer_id
      Customer.find(@transaction.customer_id)
    else
      render json: { error: 'Recipient not found' }, status: :not_found
    end
  end


  private

  def set_refund_request
    @refund_request = RefundRequest.find(params[:id])
  end

  def refund_request_params
    params.require(:refund_request).permit(:recipient_id, :recipient_type, :transaction_id, :status, :expected_amount, :refund_amount)
  end
end

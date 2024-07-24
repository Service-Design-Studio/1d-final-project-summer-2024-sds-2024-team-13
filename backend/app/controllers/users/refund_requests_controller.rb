# app/controllers/users/refund_requests_controller.rb
module Users
  class RefundRequestsController < ApplicationController
    before_action :set_user
    before_action :set_transaction
    before_action :set_refund_request, only: [:show, :update_status, :destroy]

    def show
      render json: @refund_request
    end

    def create
      @refund_request = RefundRequest.new(refund_request_params)
      @refund_request.sender = @user
      @refund_request.transaction_record = @transaction
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

    def destroy
      if @refund_request.sender == @user
        @refund_request.destroy
        render json: { status: 'Refund request deleted successfully' }, status: :ok
      else
        render json: { error: 'You are not authorized to delete this refund request' }, status: :forbidden
      end
    end

    private

    def set_user
      @user = User.find(params[:user_id])
    end

    def set_transaction
      @transaction = @user.transactions.find(params[:id])
    end

    def set_refund_request
      @refund_request = RefundRequest.find(params[:id])
    end

    def refund_request_params
      params.require(:refund_request).permit(:transaction_id, :status, :expect_amount, :refund_amount)
    end

    def determine_recipient_from_params
      recipient_id = params[:refund_request][:recipient_id]
      recipient_type = params[:refund_request][:recipient_type]

      if recipient_type == 'User' && User.exists?(recipient_id)
        User.find(recipient_id)
      elsif recipient_type == 'Customer' && Customer.exists?(recipient_id)
        Customer.find(recipient_id)
      else
        render json: { error: 'Recipient not found' }, status: :not_found
      end
    end
  end
end

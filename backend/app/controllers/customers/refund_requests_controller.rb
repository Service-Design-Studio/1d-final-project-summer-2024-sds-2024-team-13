# app/controllers/customers/refund_requests_controller.rb
module Customers
  class RefundRequestsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_customer
    before_action :set_transaction, except: [:index]
    before_action :set_refund_request, except: [:create, :index]

    def show
      render json: @refund_request
    end

    def index
      @refund_requests = @customer.refund_requests
      render json: @refund_requests
    end
    
    def create
      @refund_request = RefundRequest.new(refund_request_params)
      @refund_request.sender_type = "Customer"
      @refund_request.transaction_record = @transaction
      @refund_request.recipient_type = "User"          #edited here
      #@refund_request.recipient = determine_recipient_from_params
      
      # if @refund_request.recipient.nil?
      #   return render json: { error: 'Recipient not found' }, status: :not_found
      # end
      
      @refund_request.customer_id = @customer.customer_id
      # @refund_request.user_id = @refund_request.recipient_id
      @refund_request.status ||= 'pending'

      if @refund_request.save
        render json: { status: 'Refund request created successfully', refund_request: @refund_request }, status: :created
      end
    end

    def update
      if @refund_request.update(status: params[:status], response_reason: params[:response_reason])
        render json: { status: 'Refund request status updated successfully', refund_request: @refund_request }, status: :ok
      else
        render json: { errors: @refund_request.errors.full_messages }, status: :unprocessable_entity
      end
    end
    

    def destroy
      @refund_request.destroy
      render json: { status: 'Refund request deleted successfully' }, status: :ok
    end

    private

    def set_customer
      @customer = Customer.find_by(customer_id: params[:customer_id])
      
      if @customer.nil?
        render json: { error: 'Customer not found' }, status: :not_found
      end
    end

    def set_transaction
      @transaction = @customer.transactions.find_by(transaction_id: params[:transaction_id])
      
      if @transaction.nil?
        render json: { error: 'Transaction not found' }, status: :not_found
      end
    end
    
    def set_refund_request
      @refund_request = RefundRequest.find_by(refund_request_id: params[:id])
      
      if @refund_request.nil?
        render json: { error: 'Refund request not found' }, status: :not_found
      end
    end

    def refund_request_params
      params.require(:refund_request).permit(:transaction_id, :status, :expect_amount, :refund_amount, :request_reason, :response_reason, :user_id)
    end

#     def determine_recipient_from_params
#       recipient_id = params[:refund_request][:recipient_id]
      
#       if User.exists?(recipient_id)
#         User.find(recipient_id)
#       # elsif Customer.exists?(recipient_id)
#       #   Customer.find(recipient_id)
#       else
#         nil
#       end
#     end
   end
end

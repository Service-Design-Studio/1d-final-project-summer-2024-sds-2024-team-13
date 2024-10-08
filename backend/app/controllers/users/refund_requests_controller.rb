# app/controllers/users/refund_requests_controller.rb
module Users
  class RefundRequestsController < ApplicationController
    skip_before_action :verify_authenticity_token
    before_action :set_user
    before_action :set_transaction, except: [:index]
    before_action :set_refund_request, except: [:create, :index]

    def show
      render json: @refund_request
    end

    def create
      @refund_request = RefundRequest.new(refund_request_params)
      @refund_request.sender_type = "User"
      @refund_request.recipient_type = "Customer"
      @refund_request.transaction_record = @transaction
      #@refund_request.recipient = determine_recipient_from_params #if param[:recipient_id] match User/Customer, set @refund_request.recipient_id, _type"User/Customer"
      @refund_request.user_id = @user.user_id 
      @refund_request.status ||= 'pending'
      if @refund_request.save
        render json: { status: 'Refund request created successfully', refund_request: @refund_request }, status: :created
      else
        render json: { errors: @refund_request.errors.full_messages }, status: :unprocessable_entity
      end
    end
    def index
      # Assuming you want to get refund requests for a specific customer
      @refund_requests = @user.refund_requests
      render json: @refund_requests
    end
    def update
      if @refund_request.update(refund_request_params)
        render json: { status: 'Refund request status updated successfully', refund_request: @refund_request }, status: :ok
      else
        render json: { errors: @refund_request.errors.full_messages }, status: :unprocessable_entity
      end
    end
    #   else
    #     render json: { error: 'You are not authorized to update this refund request' }, status: :forbidden
    #   end
    # end

    def destroy
      @refund_request.destroy
      render json: { status: 'Refund request deleted successfully' }, status: :ok
    end

    private

    def set_user
      Rails.logger.debug("Received parameters: #{params.inspect}")
      Rails.logger.debug("Received user_id: #{params[:user_id]}")
      @user = User.find_by(user_id: params[:user_id])
    
      if @user.nil?
        Rails.logger.debug("User with user_id #{params[:user_id]} not found")
        render json: { error: 'User not found' }, status: :not_found
      end
    end
    

    def set_transaction
      @transaction = @user.transactions.find(params[:transaction_id])
    end
    
    def set_refund_request
      @refund_request = RefundRequest.find_by(refund_request_id: params[:id])
   end

    def refund_request_params
      params.require(:refund_request).permit(:transaction_id, :status, :expect_amount, :refund_amount, :customer_id, :request_reason, :response_reason)
    end

#     def determine_recipient_from_params
#       recipient_id = params[:refund_request][:recipient_id]
  
#       if Customer.exists?(recipient_id)
#         Customer.find(recipient_id)
#       elsif User.exists?(recipient_id)
#         User.find(recipient_id)
#       else
#         nil
#       end
#     end
   end
end

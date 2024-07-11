module Users
  class TransactionsController < ApplicationController
    before_action :set_user
    before_action :set_transaction, only: [:show, :update, :destroy, :create, :index]

    

    # GET /transactions or /users/:user_id/transactions
    def index
      if @user
        render json: @user.transactions
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    # GET /transactions/:id
    def show
      render json: @transaction
    end

    # POST /users/:user_id/transactions
    def create
      @customer = Customer.find_by(customer_id: transaction_params[:customer_id])
      unless @customer
        render json: { error: 'Customer not found' }, status: :not_found
        return
      end
      
      @transaction = @user.transactions.build(transaction_params)
      
      if @transaction.save
        render json: @transaction, status: :created, location: user_transaction_path(@user, @transaction)
      else
        render json: @transaction.errors, status: :unprocessable_entity
      end
    end
    
    private
    def set_user
      Rails.logger.debug "Attempting to find user with user_id: #{params[:user_id]}"
      @user = User.find_by(user_id: params[:user_id])
      if @user.nil?
        respond_to do |format|
          format.html { redirect_to users_path, alert: 'User not found. Please select a valid user.' }
          format.json { render json: { error: 'User not found' }, status: :not_found }
        end
      end
    end
    

    def set_transaction
      Rails.logger.debug "Parameters: #{params.inspect}"
      @transaction = @user.transactions.find_by(transaction_id: params[:id])
    end


    def transaction_params
      params.require(:transaction).permit(:customer_id, :customer_number, :payment_method, :amount,)
    end
  end
end
module Users
  class TransactionsController < ApplicationController
    before_action :set_user
    before_action :set_transaction, only: [:show, :update, :destroy]

    # GET /users/:user_id/transactions
    def index
      if @user
        render json: @user.transactions
      end
    end

    # GET /users/:user_id/transactions/:transaction_id
    def show
      if @transaction
        render json: @transaction
      end
    end

    # POST /users/:user_id/transactions
    def create
      required_params = [:transaction_id, :customer_id, :customer_number, :payment_method, :amount, :status]
      missing_params = required_params.select { |param| transaction_params[param].blank? }

      unless missing_params.empty?
        render json: { error: 'Missing or blank parameters', missing_params: missing_params }, status: :unprocessable_entity
        return
      end

      @customer = Customer.find_by(customer_id: transaction_params[:customer_id])
      unless @customer
        render json: { error: 'Customer not found' }, status: :not_found
        return
      end

      @transaction = @user.transactions.build(transaction_params)
      @transaction.user_name = @user.name

      if @transaction.save
        render json: @transaction, status: :created, location: user_transaction_path(@user, @transaction)
      else
        render json: { error: 'Transaction could not be saved' }, status: :unprocessable_entity
      end
    end


    private

    def set_user
      Rails.logger.debug "Attempting to find user with user_id: #{params[:user_id]}"
      @user = User.find_by(user_id: params[:user_id])
      unless @user
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    def set_transaction
      @transaction = @user.transactions.find(params[:transaction_id])
      unless @transaction
        render json: { error: 'Transaction not found' }, status: :not_found
      end
    end
    
    
    def transaction_params
      params.require(:transaction).permit(:transaction_id, :customer_id, :customer_number, :payment_method, :amount, :status)
    end
  end
end

class HistoryController < ApplicationController
    before_action :set_user
  
    def index
      transactions = @user.transactions
      render json: { transactions: transactions }
    end
  
    def show_transaction
      transactions = @user.transactions
      render json: { transactions: transactions }
    end
  
    def create_transaction
      transaction = @user.transactions.new(transaction_params)
      if transaction.save
        render json: { transaction: transaction }, status: :created
      else
        render json: transaction.errors, status: :unprocessable_entity
      end
    end
  
    def date_range
      start_date = params[:start_date]
      end_date = params[:end_date]
      transactions = @user.transactions.where(timestamp: start_date..end_date)
      render json: { transactions: transactions }
    end
  
    private
  
    def set_user
      @user = User.find(params[:id])
    end
  
    def transaction_params
      params.require(:transaction).permit(:transactionID, :transactionSum, :userID, :amount, :timestamp, :paymentMethod)
    end
  end
  
module Customers
  class TransactionsController < ApplicationController
    before_action :set_customer

    # GET /customers/:customer_id/transactions
    def index
      @transactions = Transaction.where(customer_id: @customer.customer_id)
      render json: @transactions
    end

    # GET /customers/:customer_id/transactions/:id
    def show
      @transaction = @customer.transactions.find(params[:id])
      render json: @transaction
    end

    private

    def set_customer
      @customer = Customer.find(params[:customer_id])
    end
  end
end

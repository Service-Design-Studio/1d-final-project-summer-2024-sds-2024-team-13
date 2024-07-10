class CustomerTransactionsController < ApplicationController
  before_action :set_customer, only: [:index, :new, :create, :show]
  before_action :set_transaction, only: %i[show edit update destroy]
  
  # GET /transactions or /customers/:customer_id/transactions
  def index
    respond_to do |format|
      if @customer
        @transactions = @customer.transactions
        format.html { render :index }
        format.json { render json: @transactions }
      else
        @transactions = Transaction.all
        format.html { render :index } 
        format.json { render json: @transactions }
      end
    end
  end

  # GET /transactions/:transaction_id
  def show
  end

  # POST /customers/:customer_id/transactions/:transaction_id
  def create
    @customer = customer.find(params[:customer_id])
    @transaction = @customer.transactions.build(transaction_params)
  
    if @transaction.save
      redirect_to customer_transaction_path(@customer, @transaction), notice: 'Transaction was successfully created.'
    else
      render :new  # Render the 'new' template with errors
    end
  end
  
  private
  def set_customer
    Rails.logger.debug "Attempting to find customer with customer_id: #{params[:customer_id]}"
    @customer = Customer.find_by(customer_id: params[:customer_id])
    if @customer.nil?
      respond_to do |format|
        format.html { redirect_to customers_path, alert: 'customer not found. Please select a valid customer.' }
        format.json { render json: { error: 'customer not found' }, status: :not_found }
      end
    end
  end
  

    def set_transaction
      Rails.logger.debug "Parameters: #{params.inspect}"
      @transaction = @customer.transactions.find_by(transaction_id: params[:id])
    end

    
    def transaction_params
      params.require(:transaction).permit(:payee_id, :payee_number, :payment_method, :amount)
    end
end

class TransactionsController < ApplicationController
  before_action :set_user
  before_action :set_transaction, only: %i[show edit update destroy]

  # GET /users/:user_id/transactions
  def index
    @transactions = @user.transactions
  end

  # GET /users/:user_id/transactions/:transaction_id
  def show
    @transaction = Transaction.find(params[:transaction_id])
  end

  # GET /users/:user_id/transactions/new
  def new
    @transaction = @user.transactions.build
  end

  # POST /users/:user_id/transactions/:transaction_id
  def create
    @user = User.find(params[:user_id])
    @transaction = @user.transactions.build(transaction_params)
  
    if @transaction.save
      redirect_to user_transaction_path(@user, @transaction), notice: 'Transaction was successfully created.'
    else
      render :new  # Render the 'new' template with errors
    end
  end
  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:user_id])
    end

    def set_transaction
        @transaction = @user.transactions.find_by(transaction_id: params[:transaction_id])
    end

    # Only allow a trusted parameter "white list" through.
    def transaction_params
      params.require(:transaction).permit(:payee_id, :payee_number, :payment_method, :amount)
    end
end

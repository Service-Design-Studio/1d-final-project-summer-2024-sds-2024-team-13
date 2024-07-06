class TransactionsController < ApplicationController
  before_action :set_user
  before_action :set_transaction, only: %i[show edit update destroy]

  # GET /users/:user_id/transactions
  def index
    @transactions = @user.transactions
  end

  # GET /users/:user_id/transactions/1
  def show
  end

  # GET /users/:user_id/transactions/new
  def new
    @transaction = @user.transactions.build
  end

  # GET /users/:user_id/transactions/:transaction_id/edit
  def edit
  end

  # POST /users/:user_id/transactions/:transaction_id
  def create
    @transaction = @user.transactions.build(transaction_params)

    respond_to do |format|
      if @transaction.save
        format.html { redirect_to user_transaction_path(@user, @transaction), notice: 'Transaction was successfully created.' }
        format.json { render :show, status: :created, location: user_transaction_url(@user, @transaction) }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/:user_id/transactions/:transaction_id
  def update
    respond_to do |format|
      if @transaction.update(transaction_params)
        format.html { redirect_to user_transaction_path(@user, @transaction.transaction_id), notice: 'Transaction was successfully updated.' }
        format.json { render :show, status: :ok, location: user_transaction_url(@user, @transaction.transaction_id) }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @transaction.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/:user_id/transactions/:transaction_id
  def destroy
    @transaction.destroy

    respond_to do |format|
      format.html { redirect_to user_transactions_url(@user), notice: 'Transaction was successfully destroyed.' }
      format.json { head :no_content }
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

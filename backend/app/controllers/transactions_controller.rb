class TransactionsController < ApplicationController
  
  before_action :set_user, only: [:index, :new, :create, :show]
  before_action :set_transaction, only: %i[show edit update destroy]
  
  # GET /transactions or /users/:user_id/transactions
  def index
    respond_to do |format|
      if @user
        @transactions = @user.transactions
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

  # GET /users/:user_id/transactions/:transaction_id/edit
  def edit
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
      params.require(:transaction).permit(:payee_id, :payee_number, :payment_method, :amount)
    end
end

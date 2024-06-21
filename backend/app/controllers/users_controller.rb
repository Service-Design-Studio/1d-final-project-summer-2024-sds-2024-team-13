class UsersController < ApplicationController
  before_action :set_user, only: [:home, :refresh_home, :recent_transaction, :create_transaction, :show_settings, :update_settings, :daily_earnings, :update_daily_earnings]

  def index
    @users = User.all
    render json: @users
  end

  def home
    render json: { user: @user, message: "Home Page" }
  end

  def refresh_home
    @user.touch
    render json: { user: @user, message: "Home Page Refreshed" }
  end

  def recent_transaction
    transaction = @user.transactions.last
    render json: { transaction: transaction }
  end

  def create_transaction
    transaction = @user.transactions.new(transaction_params)
    if transaction.save
      render json: { transaction: transaction }, status: :created
    else
      render json: transaction.errors, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])
    if user && user.authenticate(params[:password])
      render json: { user: user, message: "Logged in successfully" }
    else
      render json: { error: "Invalid email or password" }, status: :unauthorized
    end
  end

  def show_settings
    render json: { settings: @user.settings }
  end

  def update_settings
    if @user.update(settings_params)
      render json: { settings: @user.settings }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def daily_earnings
    render json: { daily_earnings: @user.daily_earnings }
  end

  def update_daily_earnings
    if @user.update(daily_earnings_params)
      render json: { daily_earnings: @user.daily_earnings }
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def transaction_params
    params.require(:transaction).permit(:transactionID, :transactionSum, :userID, :amount, :timestamp, :paymentMethod)
  end

  def settings_params
    params.require(:user).permit(:endDayTiming) # Adjust this to your actual settings attributes
  end

  def daily_earnings_params
    params.require(:user).permit(:daily_earnings) # Adjust this to your actual daily earnings attributes
  end
end

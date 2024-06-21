lass SettingsController < ApplicationController
  before_action :set_user

  def show
    settings = @user.settings
    render json: { settings: settings }
  end

  def update
    settings = @user.settings
    if settings.update(settings_params)
      render json: { settings: settings }
    else
      render json: settings.errors, status: :unprocessable_entity
    end
  end

  def daily_earnings
    daily_earnings = @user.daily_earnings
    render json: { daily_earnings: daily_earnings }
  end

  def update_daily_earnings
    daily_earnings = @user.daily_earnings
    if daily_earnings.update(daily_earnings_params)
      render json: { daily_earnings: daily_earnings }
    else
      render json: daily_earnings.errors, status: :unprocessable_entity
    end
  end

  private

  def set_user
    @user = User.find(params[:id])
  end

  def settings_params
    params.require(:settings).permit(:some_setting_attribute)
  end

  def daily_earnings_params
    params.require(:daily_earnings).permit(:amount)
  end
end
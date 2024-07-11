class UsersController < ApplicationController
  before_action :set_user, only: %i[show update destroy show_earnings_cutoff update_earnings_cutoff]

  # GET /users or /users.json
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/:user_id or /users/:user_id.json
  def show
    render json: @user
  end

  # GET /users/:id/earnings_cutoff
  def show_earnings_cutoff
    render json: { earnings_cutoff_time: @user.earnings_cutoff_time }
  end

  # PUT /users/:id/earnings_cutoff
  def update_earnings_cutoff
    earnings_cutoff_time = params.dig(:user, :earnings_cutoff_time)
    
    if earnings_cutoff_time.nil?
      render json: { error: "Earnings cutoff time cannot be nil" }, status: :unprocessable_entity
    elsif @user.update_attribute(:earnings_cutoff_time, earnings_cutoff_time)
      render json: { earnings_cutoff_time: @user.earnings_cutoff_time }, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)
    if @user.save
      token = JWT.encode({ user_id: @user.user_id, exp: 24.hours.from_now.to_i }, Rails.application.secrets.secret_key_base, 'HS256')
      render json: { user: @user.as_json(except: [:password_digest]), token: token }, status: :created
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/:user_id or /users/:user_id.json
  def update
    if @user.update(user_params)
      render json: @user, status: :ok
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:user_id or /users/:user_id.json
  def destroy
    @user.destroy
    head :no_content
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find_by(user_id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :phone_num)
    end
    
    def earnings_cutoff_time_param
      params.require(:user).permit(:earnings_cutoff_time)[:earnings_cutoff_time]
    end
end

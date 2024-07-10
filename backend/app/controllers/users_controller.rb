class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]

  # GET /users or /users.json
  def index
    @users = User.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users }
    end
  end

  # GET /users/1 or /users/1.json
  def show
    @user = User.find(params[:id])
    @transactions = @user.transactions
    render json: @user
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users or /users.json
  def create
    @user = User.new(user_params)
  
    respond_to do |format|
      if @user.save
        # Encoding user_id and expiration into the token
        token = JWT.encode({ user_id: @user.id, exp: 24.hours.from_now.to_i }, Rails.application.secrets.secret_key_base, 'HS256')
        # Responding with JSON
        format.json { render json: { user: @user.as_json(except: [:password_digest]), token: token }, status: :created }
        # Only provide HTML response if your app also serves HTML
        format.html { redirect_to @user, notice: "User was successfully created." }
      else
        # Provide detailed error messages for both formats
        format.json { render json: @user.errors.full_messages, status: :unprocessable_entity }
        format.html { render :new, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to user_url(@user), notice: "User was successfully updated." }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy!

    respond_to do |format|
      format.html { redirect_to users_url, notice: "User was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :password, :phone_num)
    end
end

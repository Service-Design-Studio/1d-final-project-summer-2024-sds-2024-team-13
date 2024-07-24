class SessionsController < ApplicationController
    def new
    end
  
    def create      #create hawker session
        user = User.find_by(email: params[:email])
    
        if user&.authenticate(params[:password])
          token = encode_token({ user_id: user.id })     
          render json: { token: token, user_id: user.id, email: user.email }, status: :ok
        else
          render json: { error: 'Invalid credentials' }, status: :unauthorized
        end
    end
  
    private
  
    def encode_token(payload)
      JWT.encode(payload, Rails.application.secrets.secret_key_base)
    end
end


#application gets credentials
#login session

class CustomerSessionsController < ApplicationController
  def create      #create customer session 
    customer = Customer.find_by(phone_num: params[:phone_num])

    if customer&.authenticate(params[:password])
      token = encode_token({ customer_id: customer.customer_id })
      render json: { token: token, customer_id: customer.customer_id, name: customer.name }, status: :ok
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  private

  def encode_token(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end
end

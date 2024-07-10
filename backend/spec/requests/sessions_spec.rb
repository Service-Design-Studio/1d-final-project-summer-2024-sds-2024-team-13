# spec/requests/sessions_spec.rb
require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  describe 'POST /users/login' do
    let(:user) { User.create(email: 'test@example.com', password: 'password') }

    context 'with valid credentials' do
      it 'returns a token and user info' do
        post '/users/login', params: { email: user.email, password: user.password }
        
        expect(response).to have_http_status(:ok)
        expect(JSON.parse(response.body)).to include('token', 'user_id' => user.id, 'email' => user.email)
      end
    end

    context 'with invalid credentials' do
      it 'returns an unauthorized status' do
        post '/users/login', params: { email: user.email, password: 'wrongpassword' }
        
        expect(response).to have_http_status(:unauthorized)
        expect(JSON.parse(response.body)).to include('error' => 'Invalid credentials')
      end
    end
  end
end

# spec/requests/users_spec.rb
require 'rails_helper'

RSpec.describe UsersController, type: :request do
  let(:valid_attributes) {
    { name: 'Test User', phone_num: '1234567890', user_id: 'test_user', email: 'test@example.com', password: 'password123' }
  }

  let(:invalid_attributes) {
    { name: nil, email: nil, phone_num: nil, password: nil }
  }

  let(:new_attributes) {
    { name: 'Updated User' }
  }

  let(:earnings_cutoff_time) {
    { earnings_cutoff_time: '15:00' }
  }

  describe "GET /index" do
    it "returns a successful response" do
      User.create! valid_attributes
      get users_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "returns a successful response" do
      user = User.create! valid_attributes
      get user_url(user.user_id)
      expect(response).to be_successful
    end
  end

  describe "GET /earnings_cutoff" do
    it "returns the earnings cutoff time" do
      user = User.create! valid_attributes
      get earnings_cutoff_user_url(user.user_id)
      expect(response).to be_successful
    end
  end

  describe "PUT /earnings_cutoff" do
    it "updates the earnings cutoff time" do
      user = User.create! valid_attributes
      put earnings_cutoff_user_url(user.user_id), params: { user: earnings_cutoff_time }
      expect(response).to have_http_status(:ok)
    end

    it "returns unprocessable entity for invalid params" do
      user = User.create! valid_attributes
      put earnings_cutoff_user_url(user.user_id), params: { user: { earnings_cutoff_time: nil } }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new User" do
        expect {
          post users_url, params: { user: valid_attributes }
        }.to change(User, :count).by(1)
      end

      it "renders a JSON response with the new user" do
        post users_url, params: { user: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include('application/json')
      end
    end

    context "with invalid parameters" do
      it "does not create a new User" do
        expect {
          post users_url, params: { user: invalid_attributes }
        }.to change(User, :count).by(0)
      end

      it "renders a JSON response with errors for the new user" do
        post users_url, params: { user: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include('application/json')
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      it "updates the requested user" do
        user = User.create! valid_attributes
        patch user_url(user.user_id), params: { user: new_attributes }
        user.reload
        expect(user.name).to eq('Updated User')
      end

      it "renders a JSON response with the user" do
        user = User.create! valid_attributes
        patch user_url(user.user_id), params: { user: new_attributes }
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to include('application/json')
      end
    end

    context "with invalid parameters" do
      it "does not update the user" do
        user = User.create! valid_attributes
        patch user_url(user.user_id), params: { user: invalid_attributes }
        user.reload
        expect(user.name).to eq('Test User')
      end

      it "renders a JSON response with errors for the user" do
        user = User.create! valid_attributes
        patch user_url(user.user_id), params: { user: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include('application/json')
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested user" do
      user = User.create! valid_attributes
      expect {
        delete user_url(user.user_id)
      }.to change(User, :count).by(-1)
    end

    it "returns a no content response" do
      user = User.create! valid_attributes
      delete user_url(user.user_id)
      expect(response).to have_http_status(:no_content)
    end
  end
end

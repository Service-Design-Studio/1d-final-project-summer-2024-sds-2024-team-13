require 'rails_helper'

RSpec.describe "/users", type: :request do
  
  let(:valid_attributes) {
    { name: "John Doe", email: "john@example.com", password: "password", phone_num: "1234567890" }
  }

  let(:invalid_attributes) {
    { name: "John Doe", email: "john@example.com", password: "", phone_num: "1234567890" }
  }

  describe "GET /index" do
    it "renders a successful response" do
      User.create! valid_attributes
      get users_url, as: :json
      expect(response).to be_successful
      expect(response.content_type).to include("application/json")
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      user = User.create! valid_attributes
      get user_url(user), as: :json
      expect(response).to be_successful
      expect(response.content_type).to include("application/json")
    end
  end

  # describe "GET /new" do
  #   it "renders a successful response" do
  #     get new_user_url(format: :json)
  #     expect(response).to be_successful
  #     expect(response.content_type).to include("application/json")
  #   end
  # end

  # describe "GET /edit" do
  #   it "renders a successful response" do
  #     user = User.create! valid_attributes
  #     get edit_user_url(user, format: :json)
  #     expect(response).to be_successful
  #     expect(response.content_type).to include("application/json")
  #   end
  # end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new User" do
        expect {
          post users_url, params: { user: valid_attributes }, as: :json
        }.to change(User, :count).by(1)
      end

      it "renders a JSON response with the new user" do
        post users_url, params: { user: valid_attributes }, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include("application/json")
        expect(response.body).to include("john@example.com")
      end
    end

    context "with invalid parameters" do
      it "does not create a new User" do
        expect {
          post users_url, params: { user: invalid_attributes }, as: :json
        }.to change(User, :count).by(0)
      end

      it "renders a JSON response with errors for the new user" do
        post users_url, params: { user: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include("application/json")
        expect(response.body).to include("Password can't be blank")
      end
    end
  end

  describe "PATCH /update" do
    let(:new_attributes) {
      { name: "Updated Name" }
    }

    context "with valid parameters" do
      it "updates the requested user" do
        user = User.create! valid_attributes
        patch user_url(user), params: { user: new_attributes }, as: :json
        user.reload
        expect(user.name).to eq("Updated Name")
      end

      it "renders a JSON response with the updated user" do
        user = User.create! valid_attributes
        patch user_url(user), params: { user: new_attributes }, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to include("application/json")
        expect(response.body).to include("Updated Name")
      end
    end

    # context "with invalid parameters" do
    #   it "renders a JSON response with errors for the user" do
    #     user = User.create! valid_attributes
    #     patch user_url(user), params: { user: invalid_attributes }, as: :json
    #     expect(response).to have_http_status(:unprocessable_entity)
    #     expect(response.content_type).to include("application/json")
    #     expect(response.body).to include("Password can't be blank")
    #   end
    # end
  end

  describe "DELETE /destroy" do
    it "destroys the requested user" do
      user = User.create! valid_attributes
      expect {
        delete user_url(user), as: :json
      }.to change(User, :count).by(-1)
    end
  end
end

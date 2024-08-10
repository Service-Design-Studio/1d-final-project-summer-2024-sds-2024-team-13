require 'rails_helper'

RSpec.describe "/items", type: :request do
  let!(:user) { User.create!(name: "Test User", email: "test@example.com", password: "password123") }

  let(:valid_attributes) {
    { name: "Test Item", price: "100.00", favourite: false }
  }

  let(:invalid_attributes) {
    { name: nil, price: nil }
  }

  describe "GET /index" do
    it "renders a successful response" do
      Item.create!(valid_attributes.merge(user_id: user.id))
      get "/users/#{user.id}/items"
      expect(response).to be_successful
      expect(response.content_type).to include("application/json")
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      item = Item.create!(valid_attributes.merge(user_id: user.id))
      get "/users/#{user.id}/items/#{item.id}"
      expect(response).to be_successful
      expect(response.content_type).to include("application/json")
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Item" do
        expect {
          post "/users/#{user.id}/items", params: { item: valid_attributes }, as: :json
        }.to change(Item, :count).by(1)
      end

      it "renders a JSON response with the new item" do
        post "/users/#{user.id}/items", params: { item: valid_attributes }, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include("application/json")
        expect(response.body).to include("item")
      end
    end

    context "with invalid parameters" do
      it "does not create a new Item" do
        expect {
          post "/users/#{user.id}/items", params: { item: invalid_attributes }, as: :json
        }.to change(Item, :count).by(0)
      end

      it "renders a JSON response with errors" do
        post "/users/#{user.id}/items", params: { item: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include("application/json")
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { name: "Updated Item", price: "200.00" }
      }

      it "updates the requested item" do
        item = Item.create!(valid_attributes.merge(user_id: user.id))
        patch "/users/#{user.id}/items/#{item.id}", params: { item: new_attributes }, as: :json
        item.reload
        expect(item.name).to eq("Updated Item")
        expect(item.price).to eq("200.00")
      end

      it "renders a JSON response with the updated item" do
        item = Item.create!(valid_attributes.merge(user_id: user.id))
        patch "/users/#{user.id}/items/#{item.id}", params: { item: new_attributes }, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to include("application/json")
        expect(response.body).to include("item updated successfully")
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors" do
        item = Item.create!(valid_attributes.merge(user_id: user.id))
        patch "/users/#{user.id}/items/#{item.id}", params: { item: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include("application/json")
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested item" do
      item = Item.create!(valid_attributes.merge(user_id: user.id))
      expect {
        delete "/users/#{user.id}/items/#{item.id}"
      }.to change(Item, :count).by(-1)
    end

    it "renders a JSON response with a status message" do
      item = Item.create!(valid_attributes.merge(user_id: user.id))
      delete "/users/#{user.id}/items/#{item.id}"
      expect(response).to have_http_status(:ok)
      expect(response.content_type).to include("application/json")
      expect(response.body).to include("item deleted successfully")
    end
  end
end

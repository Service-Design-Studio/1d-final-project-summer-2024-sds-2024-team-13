require 'rails_helper'

RSpec.describe "/items", type: :request do
  let!(:user) { User.create!(name: "Test User", email: "test@example.com", password: "password123") }

  let(:valid_attributes) {
    { name: "Test Item", price: "100.00" }
  }

  let(:invalid_attributes) {
    { name: nil, price: nil }
  }

  describe "GET /index" do
    it "renders a successful response" do
      Item.create!(valid_attributes.merge(user_id: user.id))
      get "/users/#{user.id}/items"
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      item = Item.create!(valid_attributes.merge(user_id: user.id))
      get "/users/#{user.id}/items/#{item.id}"
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get "/users/#{user.id}/items/new"
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      item = Item.create!(valid_attributes.merge(user_id: user.id))
      get "/users/#{user.id}/items/#{item.id}/edit"
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Item" do
        expect {
          post "/users/#{user.id}/items", params: { item: valid_attributes }
        }.to change(Item, :count).by(1)
      end

      it "redirects to the created item" do
        post "/users/#{user.id}/items", params: { item: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.body).to include("item")
      end
    end

    context "with invalid parameters" do
      it "does not create a new Item" do
        expect {
          post "/users/#{user.id}/items", params: { item: invalid_attributes }
        }.to change(Item, :count).by(0)
      end

      it "renders a response with 422 status (i.e. to display errors)" do
        post "/users/#{user.id}/items", params: { item: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
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
        patch "/users/#{user.id}/items/#{item.id}", params: { item: new_attributes }
        item.reload
        expect(item.name).to eq("Updated Item")
        expect(item.price).to eq("200.00")
      end

      it "renders a successful response" do
        item = Item.create!(valid_attributes.merge(user_id: user.id))
        patch "/users/#{user.id}/items/#{item.id}", params: { item: new_attributes }
        expect(response).to have_http_status(:ok)
        expect(response.body).to include("item updated successfully")
      end
    end

    context "with invalid parameters" do
      it "renders a response with 422 status (i.e. to display errors)" do
        item = Item.create!(valid_attributes.merge(user_id: user.id))
        patch "/users/#{user.id}/items/#{item.id}", params: { item: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
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

    it "renders a successful response" do
      item = Item.create!(valid_attributes.merge(user_id: user.id))
      delete "/users/#{user.id}/items/#{item.id}"
      expect(response).to have_http_status(:ok)
      expect(response.body).to include("item deleted successfully")
    end
  end
end

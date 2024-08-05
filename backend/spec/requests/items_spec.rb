require 'rails_helper'

RSpec.describe "/items", type: :request do
  let(:user) { User.create!(name: "Test User", email: "test+#{SecureRandom.uuid}@example.com", password: "password123") }

  let(:valid_attributes) {
    {
      name: "Test Item",
      price: "10.00",
      user_id: user.id
    }
  }

  let(:invalid_attributes) {
    {
      name: nil,
      price: nil,
      user_id: nil
    }
  }

  describe "GET /index" do
    it "renders a successful response" do
      Item.create! valid_attributes
      get user_items_url(user_id: user.id)
      expect(response).to be_successful

      json_response = JSON.parse(response.body)
      expect(json_response).to be_an_instance_of(Array)
      expect(json_response.first).to include("name" => "Test Item", "price" => "10.00")
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      item = Item.create! valid_attributes
      get user_item_url(user, item)
      expect(response).to be_successful

      json_response = JSON.parse(response.body)
      expect(json_response["item"]).to include("name" => "Test Item", "price" => "10.00")
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_user_item_url(user_id: user.id)
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      item = Item.create! valid_attributes
      get edit_user_item_url(user, item)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Item" do
        expect {
          post user_items_url(user_id: user.id), params: { item: valid_attributes }
        }.to change(Item, :count).by(1)
      end

      it "returns a created status" do
        post user_items_url(user_id: user.id), params: { item: valid_attributes }
        expect(response).to have_http_status(:created)

        json_response = JSON.parse(response.body)
        expect(json_response["item"]).to include("name" => "Test Item", "price" => "10.00")
      end
    end

    context "with invalid parameters" do
      it "does not create a new Item" do
        expect {
          post user_items_url(user_id: user.id), params: { item: invalid_attributes }
        }.to change(Item, :count).by(0)
      end

      it "renders a response with 422 status" do
        post user_items_url(user_id: user.id), params: { item: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)

        json_response = JSON.parse(response.body)
        expect(json_response["errors"]).to include("Name can't be blank", "Price can't be blank")
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { name: "Updated Item", price: "15.00" }
      }

      it "updates the requested item" do
        item = Item.create! valid_attributes
        patch user_item_url(user, item), params: { item: new_attributes }
        item.reload

        expect(item.name).to eq("Updated Item")
        expect(item.price).to eq("15.00")
      end

      it "returns an ok status" do
        item = Item.create! valid_attributes
        patch user_item_url(user, item), params: { item: new_attributes }
        expect(response).to have_http_status(:ok)

        json_response = JSON.parse(response.body)
        expect(json_response["status"]).to eq("item updated successfully")
      end
    end

    context "with invalid parameters" do
      it "renders a response with 422 status" do
        item = Item.create! valid_attributes
        patch user_item_url(user, item), params: { item: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)

        json_response = JSON.parse(response.body)
        expect(json_response["errors"]).to include("Name can't be blank", "Price can't be blank")
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested item" do
      item = Item.create! valid_attributes
      expect {
        delete user_item_url(user, item)
      }.to change(Item, :count).by(-1)
    end

    it "returns an ok status" do
      item = Item.create! valid_attributes
      delete user_item_url(user, item)
      expect(response).to have_http_status(:ok)

      json_response = JSON.parse(response.body)
      expect(json_response["status"]).to eq("item deleted successfully")
    end
  end
end

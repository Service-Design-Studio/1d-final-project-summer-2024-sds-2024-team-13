require "rails_helper"

RSpec.describe "Transactions Routing", type: :routing do
  describe "routing for Customers::TransactionsController" do
    it "routes to #index" do
      expect(get: "/customers/1/transactions").to route_to("customers/transactions#index", customer_id: "1")
    end

    it "routes to #show" do
      expect(get: "/customers/1/transactions/1").to route_to("customers/transactions#show", customer_id: "1", id: "1")
    end

    it "routes to #create" do
      expect(post: "/customers/1/transactions").to route_to("customers/transactions#create", customer_id: "1")
    end

    it "routes to #update via PUT" do
      expect(put: "/customers/1/transactions/1").to route_to("customers/transactions#update", customer_id: "1", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/customers/1/transactions/1").to route_to("customers/transactions#update", customer_id: "1", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/customers/1/transactions/1").to route_to("customers/transactions#destroy", customer_id: "1", id: "1")
    end
  end

  describe "routing for Users::TransactionsController" do
    it "routes to #index" do
      expect(get: "/users/1/transactions").to route_to("users/transactions#index", user_id: "1")
    end

    it "routes to #show" do
      expect(get: "/users/1/transactions/1").to route_to("users/transactions#show", user_id: "1", id: "1")
    end

    it "routes to #create" do
      expect(post: "/users/1/transactions").to route_to("users/transactions#create", user_id: "1")
    end

    it "routes to #update via PUT" do
      expect(put: "/users/1/transactions/1").to route_to("users/transactions#update", user_id: "1", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/users/1/transactions/1").to route_to("users/transactions#update", user_id: "1", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/users/1/transactions/1").to route_to("users/transactions#destroy", user_id: "1", id: "1")
    end
  end
end

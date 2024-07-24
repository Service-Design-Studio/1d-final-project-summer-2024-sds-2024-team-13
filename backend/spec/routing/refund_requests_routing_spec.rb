require "rails_helper"

RSpec.describe RefundRequestsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/refund_requests").to route_to("refund_requests#index")
    end

    it "routes to #new" do
      expect(get: "/refund_requests/new").to route_to("refund_requests#new")
    end

    it "routes to #show" do
      expect(get: "/refund_requests/1").to route_to("refund_requests#show", id: "1")
    end

    it "routes to #edit" do
      expect(get: "/refund_requests/1/edit").to route_to("refund_requests#edit", id: "1")
    end


    it "routes to #create" do
      expect(post: "/refund_requests").to route_to("refund_requests#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/refund_requests/1").to route_to("refund_requests#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/refund_requests/1").to route_to("refund_requests#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/refund_requests/1").to route_to("refund_requests#destroy", id: "1")
    end
  end
end

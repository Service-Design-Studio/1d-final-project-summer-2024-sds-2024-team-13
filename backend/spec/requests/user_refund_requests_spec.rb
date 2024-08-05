require 'rails_helper'

RSpec.describe "Users::RefundRequests", type: :request do
  let(:user) { User.create!(user_id: "1", name: "Test User", password: "password") }
  let(:customer) { Customer.create!(customer_id: "1", name: "Test Customer", password: "password") }
  let(:transaction) { Transaction.create!(transaction_id: "1", amount: 100, customer_id: customer.customer_id, user_id: user.user_id) }
  let(:refund_request) { RefundRequest.create!(refund_request_id: "1", transaction_id: transaction.transaction_id, user_id: user.user_id, customer_id: customer.customer_id, expect_amount: 50, status: "pending") }

  describe "GET /index" do
    it "returns a successful response" do
      get user_refund_requests_path(user_id: user.user_id)
      expect(response).to have_http_status(:ok)
    end
  end

  describe "GET /show" do
    it "returns the requested refund_request" do
      get user_transaction_refund_request_path(user_id: user.user_id, transaction_id: transaction.transaction_id, id: refund_request.refund_request_id)
      expect(response).to have_http_status(:ok)
      expect(response.body).to include(refund_request.status)
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new RefundRequest" do
        expect {
          post user_transaction_refund_request_path(user_id: user.user_id, transaction_id: transaction.transaction_id), params: { refund_request: { expect_amount: 50, transaction_id: transaction.transaction_id, user_id: user.user_id, customer_id: customer.customer_id } }
        }.to change(RefundRequest, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "does not create a new RefundRequest" do
        expect {
          post user_transaction_refund_request_path(user_id: user.user_id, transaction_id: transaction.transaction_id), params: { refund_request: { expect_amount: -50 } }
        }.to change(RefundRequest, :count).by(0)
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /update" do
    it "updates the requested refund_request" do
      patch user_transaction_refund_request_path(user_id: user.user_id, transaction_id: transaction.transaction_id, id: refund_request.refund_request_id), params: { refund_request: { status: "approved" } }
      refund_request.reload
      expect(refund_request.status).to eq("approved")
      expect(response).to have_http_status(:ok)
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested refund_request" do
      refund_request # Create the refund_request
      expect {
        delete user_transaction_refund_request_path(user_id: user.user_id, transaction_id: transaction.transaction_id, id: refund_request.refund_request_id)
      }.to change(RefundRequest, :count).by(-1)
      expect(response).to have_http_status(:ok)
    end
  end
end

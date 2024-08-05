require 'rails_helper'

RSpec.describe "/users/:user_id/refund_requests", type: :request do
  let!(:user) { User.create!(user_id: 'test_user', name: 'Test User', email: 'testuser@example.com', password: 'password123', password_confirmation: 'password123') }
  let!(:customer) { Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password_digest: 'password') }
  let!(:transaction) { Transaction.create!(transaction_id: 'test_transaction', customer_id: customer.customer_id, payment_method: 'credit', amount: 100.0, user_id: user.user_id, status: 'pending') }
  let!(:refund_request) { RefundRequest.create!(transaction_id: transaction.transaction_id, sender_id: user.id, sender_type: 'User', recipient_id: customer.id, recipient_type: 'Customer', expect_amount: 100.0, refund_amount: 50.0, status: 'pending') }

  let(:valid_attributes) {
    {
      transaction_id: transaction.transaction_id,
      sender_id: user.id,
      sender_type: 'User',
      recipient_id: customer.id,
      recipient_type: 'Customer',
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: 'pending'
    }
  }

  let(:invalid_attributes) {
    {
      transaction_id: nil,
      sender_id: user.id,
      recipient_id: customer.id,
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: nil
    }
  }

  let(:new_attributes) {
    { status: 'approved' }
  }

  describe "GET /index" do
    it "renders a successful response" do
      get user_refund_requests_url(user_id: user.user_id)
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      get user_refund_request_url(user_id: user.user_id, id: refund_request.id)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new RefundRequest" do
        expect {
          post user_refund_requests_url(user_id: user.user_id), params: { refund_request: valid_attributes }
        }.to change(RefundRequest, :count).by(1)
      end
    end

    context "with invalid parameters" do
      it "does not create a new RefundRequest" do
        expect {
          post user_refund_requests_url(user_id: user.user_id), params: { refund_request: invalid_attributes }
        }.to change(RefundRequest, :count).by(0)
      end
    end
  end

  describe "PATCH /update" do
    it "updates the requested refund_request" do
      patch user_refund_request_url(user_id: user.user_id, id: refund_request.id), params: { refund_request: new_attributes }
      refund_request.reload
      expect(refund_request.status).to eq('approved')
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested refund_request" do
      expect {
        delete user_refund_request_url(user_id: user.user_id, id: refund_request.id)
      }.to change(RefundRequest, :count).by(-1)
    end
  end
end

require 'rails_helper'

RSpec.describe "/refund_requests", type: :request do
  let!(:customer) { Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password_digest: 'password') }
  let!(:user) { User.create!(user_id: 'test_user', name: 'Test User', email: 'testuser@example.com', password: 'password123', password_confirmation: 'password123') }
  let!(:transaction) { Transaction.create!(transaction_id: 'test_transaction', customer_id: customer.customer_id, payment_method: 'credit', amount: 100.0, user_id: user.user_id) }

  # Adjusted valid attributes to use existing IDs correctly
  let(:valid_attributes) {
    {
      transaction_id: transaction.transaction_id,
      sender_id: user.user_id,
      sender_type: 'User',
      recipient_id: user.user_id,
      recipient_type: 'User',
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: 'pending'
    }
  }

  let(:invalid_attributes) {
    { transaction_id: nil }
  }

  describe "GET /index" do
    it "renders a successful response" do
      get user_refund_requests_url(user_id: user.user_id)
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      get user_transaction_refund_request_url(user_id: user.user_id, transaction_id: transaction.transaction_id, id: refund_request.id)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new RefundRequest" do
        expect {
          post user_transaction_refund_request_url(user_id: user.user_id, transaction_id: transaction.transaction_id), params: { refund_request: valid_attributes }
        }.to change(RefundRequest, :count).by(1)
      end

      it "renders a successful response" do
        post user_transaction_refund_request_url(user_id: user.user_id, transaction_id: transaction.transaction_id), params: { refund_request: valid_attributes }
        expect(response).to have_http_status(:created)
      end
    end

    context "with invalid parameters" do
      it "does not create a new RefundRequest" do
        expect {
          post user_transaction_refund_request_url(user_id: user.user_id, transaction_id: transaction.transaction_id), params: { refund_request: invalid_attributes }
        }.to change(RefundRequest, :count).by(0)
      end

      it "renders a response with 422 status" do
        post user_transaction_refund_request_url(user_id: user.user_id, transaction_id: transaction.transaction_id), params: { refund_request: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /update" do
    let!(:refund_request) { RefundRequest.create!(valid_attributes) }

    context "with valid parameters" do
      let(:new_attributes) {
        { status: 'approved' }
      }

      it "updates the requested refund_request" do
        patch user_transaction_refund_request_url(user_id: user.user_id, transaction_id: transaction.transaction_id, id: refund_request.id), params: { refund_request: new_attributes }
        refund_request.reload
        expect(refund_request.status).to eq('approved')
      end

      it "renders a successful response" do
        patch user_transaction_refund_request_url(user_id: user.user_id, transaction_id: transaction.transaction_id, id: refund_request.id), params: { refund_request: new_attributes }
        expect(response).to have_http_status(:ok)
      end
    end

    context "with invalid parameters" do
      it "renders a response with 422 status" do
        patch user_transaction_refund_request_url(user_id: user.user_id, transaction_id: transaction.transaction_id, id: refund_request.id), params: { refund_request: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /destroy" do
    let!(:refund_request) { RefundRequest.create!(valid_attributes) }

    it "destroys the requested refund_request" do
      expect {
        delete user_transaction_refund_request_url(user_id: user.user_id, transaction_id: transaction.transaction_id, id: refund_request.id)
      }.to change(RefundRequest, :count).by(-1)
    end

    it "renders a successful response" do
      delete user_transaction_refund_request_url(user_id: user.user_id, transaction_id: transaction.transaction_id, id: refund_request.id)
      expect(response).to have_http_status(:ok)
    end
  end
end

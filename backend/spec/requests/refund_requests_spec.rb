require 'rails_helper'

RSpec.describe "/refund_requests", type: :request do
  let!(:customer) { Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password_digest: 'password') }
  let!(:user) { User.create!(user_id: 'test_user', name: 'Test User', email: 'testuser@example.com', password: 'password123', password_confirmation: 'password123') }
  let!(:transaction) { Transaction.create!(transaction_id: 'test_transaction', customer_id: customer.customer_id, payment_method: 'credit', amount: 100.0, user_id: user.user_id) }
  let!(:refund_request) { RefundRequest.create!(transaction_id: transaction.transaction_id, refund_request_id: "refund request id", sender_id: customer.id, sender_type: 'Customer', recipient_id: customer.id, recipient_type: 'Customer', expect_amount: 100.0, refund_amount: 50.0, status: 'pending') }

  let(:valid_attributes) {
    {
      transaction_id: transaction.transaction_id,
      sender_id: customer.id,
      sender_type: 'Customer',
      recipient_id: user.id,
      recipient_type: 'User',
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: 'pending'
    }
  }

  let(:invalid_attributes) {
    {
      transaction_id: nil,
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
      get customer_refund_requests_url(customer_id: customer.customer_id)
      expect(response).to be_successful
    end

    context "when customer is not found" do
      it "renders a not found response" do
        get customer_refund_requests_url(customer_id: 'non_existent_customer')
        expect(response).to have_http_status(:not_found)
        expect(JSON.parse(response.body)['error']).to eq('Customer not found')
      end
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      get customer_transaction_refund_request_url(
        customer_id: customer.customer_id,
        transaction_id: transaction.transaction_id
      )
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new RefundRequest" do
        expect {
          post customer_transaction_refund_request_url(
            customer_id: customer.customer_id,
            transaction_id: transaction.transaction_id
          ), params: { refund_request: valid_attributes }
        }.to change(RefundRequest, :count).by(1)
      end

      it "renders a successful response" do
        post customer_transaction_refund_request_url(
          customer_id: customer.customer_id,
          transaction_id: transaction.transaction_id
        ), params: { refund_request: valid_attributes }
        expect(response).to have_http_status(:created)
      end

      context "with valid recipient ID that is a customer" do
        it "creates a new RefundRequest" do
          recipient_customer = Customer.create!(customer_id: 'recipient_customer', name: 'Recipient Customer', phone_num: '9876543210', password_digest: 'password')

          valid_attributes_with_customer_recipient = valid_attributes.merge({
            recipient_id: recipient_customer.id,
            recipient_type: 'Customer'
          })

          expect {
            post customer_transaction_refund_request_url(
              customer_id: customer.customer_id,
              transaction_id: transaction.transaction_id
            ), params: { refund_request: valid_attributes_with_customer_recipient }
          }.to change(RefundRequest, :count).by(1)
        end
      end
    end

    context "with invalid parameters" do
      it "does not create a new RefundRequest" do
        expect {
          post customer_transaction_refund_request_url(
            customer_id: customer.customer_id,
            transaction_id: transaction.transaction_id
          ), params: { refund_request: invalid_attributes }
        }.to change(RefundRequest, :count).by(0)
      end

      it "renders a response with 422 status" do
        post customer_transaction_refund_request_url(
          customer_id: customer.customer_id,
          transaction_id: transaction.transaction_id
        ), params: { refund_request: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /update" do
    context "when not authorized to update" do
      it "renders a forbidden response" do
        another_customer = Customer.create!(customer_id: 'another_customer', name: 'Another Customer', phone_num: '0987654321', password_digest: 'password')
        refund_request.update(recipient: another_customer)

        patch customer_transaction_refund_request_url(
          customer_id: customer.customer_id,
          transaction_id: transaction.transaction_id,
          id: refund_request.id
        ), params: { status: 'approved' }
        expect(response).to have_http_status(:forbidden)
        expect(JSON.parse(response.body)['error']).to eq('You are not authorized to update this refund request')
      end
    end

    context "with valid parameters" do
      it "updates the requested refund_request" do
        patch customer_transaction_refund_request_url(
          customer_id: customer.customer_id,
          transaction_id: transaction.transaction_id,
          id: refund_request.id
        ), params: { status: 'approved' }
        refund_request.reload
        expect(refund_request.status).to eq('approved')
      end

      it "renders a successful response" do
        patch customer_transaction_refund_request_url(
          customer_id: customer.customer_id,
          transaction_id: transaction.transaction_id,
          id: refund_request.id
        ), params: { status: 'approved' }
        expect(response).to have_http_status(:ok)
      end

      it "updates the requested refund_request with new attributes" do
        patch customer_transaction_refund_request_url(
          customer_id: customer.customer_id,
          transaction_id: transaction.transaction_id,
          id: refund_request.id
        ), params: new_attributes
        refund_request.reload
        expect(refund_request.status).to eq(new_attributes[:status])
      end
    end

    context "with invalid parameters" do
      it "renders a response with 422 status" do
        patch customer_transaction_refund_request_url(
          customer_id: customer.customer_id,
          transaction_id: transaction.transaction_id,
          id: refund_request.id
        ), params: { status: nil }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /destroy" do
    context "when not authorized to delete" do
      it "renders a forbidden response" do
        another_customer = Customer.create!(customer_id: 'another_customer', name: 'Another Customer', phone_num: '0987654321', password_digest: 'password')
        refund_request.update(sender: another_customer)

        delete customer_transaction_refund_request_url(
          customer_id: customer.customer_id,
          transaction_id: transaction.transaction_id,
          id: refund_request.id
        )
        expect(response).to have_http_status(:forbidden)
        expect(JSON.parse(response.body)['error']).to eq('You are not authorized to delete this refund request')
      end
    end

    it "destroys the requested refund_request" do
      expect {
        delete customer_transaction_refund_request_url(
          customer_id: customer.customer_id,
          transaction_id: transaction.transaction_id,
          id: refund_request.id
        )
      }.to change(RefundRequest, :count).by(-1)
    end
  end
end

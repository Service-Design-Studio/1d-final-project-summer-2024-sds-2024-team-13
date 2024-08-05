require 'rails_helper'

RSpec.describe Customers::RefundRequestsController, type: :controller do
  let!(:customer) { Customer.create(customer_id: 'cust_123', password: 'password') }
  let!(:transaction) { customer.transactions.create(transaction_id: 'trans_123') }
  let!(:user) { User.create(user_id: 'user_123', password: 'password') }
  let!(:refund_request) { RefundRequest.create(
    transaction_id: 'trans_123',
    status: 'pending',
    expect_amount: 100.0,
    refund_amount: 50.0,
    request_reason: 'Test reason',
    response_reason: 'Test response',
    customer_id: customer.customer_id,
    user_id: user.user_id,
    sender_type: 'Customer',
    recipient_type: 'User',
    id: SecureRandom.uuid  # Ensure this is set properly
  )}

  describe 'GET #show' do
    it 'returns the requested refund request' do
      get :show, params: { customer_id: customer.id, id: refund_request.id }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['refund_request_id']).to eq(refund_request.id)
    end

    it 'returns not found if the refund request does not exist' do
      get :show, params: { customer_id: customer.customer_id, id: 'nonexistent' }
      expect(response).to have_http_status(:not_found)
    end
  end

  describe 'GET #index' do
    it 'returns a list of refund requests for the customer' do
      get :index, params: { customer_id: customer.customer_id }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body).first['refund_request_id']).to eq(refund_request.refund_request_id)
    end

    it 'returns an empty list if the customer has no refund requests' do
      Customer.create(customer_id: 'cust_456', password: 'password')
      get :index, params: { customer_id: 'cust_456' }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to be_empty
    end
  end

  describe 'POST #create' do
    it 'creates a new refund request' do
      post :create, params: {
        customer_id: customer.customer_id,
        refund_request: {
          transaction_id: 'trans_456',
          status: 'pending',
          expect_amount: 150.0,
          refund_amount: 75.0,
          request_reason: 'Another reason',
          response_reason: 'Another response',
          user_id: user.user_id
        }
      }
      expect(response).to have_http_status(:created)
      body = JSON.parse(response.body)
      expect(body['status']).to eq('Refund request created successfully')
      expect(body['refund_request']['transaction_id']).to eq('trans_456')
    end

    it 'returns error if refund request is invalid' do
      post :create, params: {
        customer_id: customer.customer_id,
        refund_request: {
          transaction_id: nil,
          status: nil,
          expect_amount: nil,
          refund_amount: nil
        }
      }
      expect(response).to have_http_status(:unprocessable_entity)
      body = JSON.parse(response.body)
      expect(body['errors']).to include("Transaction can't be blank", "Status can't be blank", "Expect amount can't be blank", "Refund amount can't be blank")
    end
  end

  describe 'PUT #update' do
    it 'updates the refund request' do
      put :update, params: {
        customer_id: customer.customer_id,
        id: refund_request.refund_request_id,
        status: 'approved',
        response_reason: 'Approved after review'
      }
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body['status']).to eq('Refund request status updated successfully')
      expect(body['refund_request']['status']).to eq('approved')
    end

    it 'returns error if the update fails' do
      put :update, params: {
        customer_id: customer.customer_id,
        id: refund_request.refund_request_id,
        status: nil
      }
      expect(response).to have_http_status(:unprocessable_entity)
      body = JSON.parse(response.body)
      expect(body['errors']).to include("Status can't be blank")
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes the refund request' do
      delete :destroy, params: { customer_id: customer.customer_id, id: refund_request.refund_request_id }
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body['status']).to eq('Refund request deleted successfully')
    end

    it 'returns not found if the refund request does not exist' do
      delete :destroy, params: { customer_id: customer.customer_id, id: 'nonexistent' }
      expect(response).to have_http_status(:not_found)
    end
  end

  # Ensure that the controller methods are called with correct parameters
  describe 'Private methods' do
    # You might need to test these if they are more complex,
    # but typically, private methods are tested indirectly via public actions
  end
end

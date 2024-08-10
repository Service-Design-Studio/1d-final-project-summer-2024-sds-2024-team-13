RSpec.describe Customers::RefundRequestsController, type: :controller do
  let!(:customer) { Customer.create!(password: 'password') }
  let!(:user) { User.create!(password: 'password') }
  let!(:transaction) { Transaction.create!(
    transaction_id: SecureRandom.hex(10),
    customer_id: customer.customer_id,
    user_id: user.user_id,
    amount: 100.0
  )}
  let!(:refund_request) { RefundRequest.create!(
    transaction_id: transaction.transaction_id,
    status: 'pending',
    expect_amount: 100.0,
    refund_amount: 50.0,
    request_reason: 'Test reason',
    response_reason: 'Test response',
    customer_id: customer.customer_id,
    user_id: user.user_id
  )}

  describe 'Customer not found' do
    it 'returns not found status when customer does not exist' do
      get :index, params: { customer_id: 'non_existent_customer_id' }
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)).to eq({ 'error' => 'Customer not found' })
    end
  end

  describe 'Transaction not found' do
    it 'returns not found status when transaction does not exist' do
      get :show, params: { 
        customer_id: customer.customer_id, 
        transaction_id: 'non_existent_transaction_id',
        id: refund_request.refund_request_id
      }
      expect(response).to have_http_status(:not_found)
      expect(JSON.parse(response.body)).to eq({ 'error' => 'Transaction not found' })
    end
  end

  describe 'GET #show' do
    it 'returns the requested refund request' do
      get :show, params: { customer_id: customer.customer_id, transaction_id: transaction.transaction_id, id: refund_request.refund_request_id }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)['refund_request_id']).to eq(refund_request.refund_request_id)
    end

    it 'returns not found if the refund request does not exist' do
      get :show, params: { customer_id: customer.customer_id, transaction_id: transaction.transaction_id, id: 'nonexistent' }
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
      new_customer = Customer.create!(password: 'password')
      get :index, params: { customer_id: new_customer.customer_id }
      expect(response).to have_http_status(:ok)
      expect(JSON.parse(response.body)).to be_empty
    end
  end

  describe 'POST #create' do
    it 'creates a new refund request' do
      post :create, params: {
        customer_id: customer.customer_id,
        transaction_id: transaction.transaction_id,
        refund_request: {
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
      expect(body['refund_request']['transaction_id']).to eq(transaction.transaction_id)
    end

    it 'returns no content if refund request is invalid' do
      post :create, params: {
        customer_id: customer.customer_id,
        transaction_id: transaction.transaction_id,
        refund_request: {
          expect_amount: nil,
          refund_amount: nil
        }
      }
      expect(response).to have_http_status(:no_content)
    end
  end

  describe 'PUT #update' do
    it 'updates the refund request' do
      put :update, params: {
        customer_id: customer.customer_id,
        transaction_id: transaction.transaction_id,
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
      # Assuming that an empty status will cause a validation error
      put :update, params: {
        customer_id: customer.customer_id,
        transaction_id: transaction.transaction_id,
        id: refund_request.refund_request_id,
        status: '',
        response_reason: 'Invalid update'
      }
      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe 'DELETE #destroy' do
    it 'deletes the refund request' do
      delete :destroy, params: { customer_id: customer.customer_id, transaction_id: transaction.transaction_id, id: refund_request.refund_request_id }
      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body['status']).to eq('Refund request deleted successfully')
    end

    it 'returns not found if the refund request does not exist' do
      delete :destroy, params: { customer_id: customer.customer_id, transaction_id: transaction.transaction_id, id: 'nonexistent' }
      expect(response).to have_http_status(:not_found)
    end
  end
end
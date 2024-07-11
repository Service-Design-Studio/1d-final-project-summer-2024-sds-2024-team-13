require 'rails_helper'

RSpec.describe "CustomerTransactions", type: :request do
  let!(:user) { User.create!(name: 'Test User', email: 'user@example.com', password: 'password') }
  let!(:customer) { Customer.create!(phone_num: '1234567890', name: 'Test Customer', password: 'password') }
  let!(:transaction) { Transaction.create!(customer_id: customer.customer_id, user_id: user.user_id, payment_method: 'credit', amount: 100.0) }

  describe "GET /customers/:customer_id/transactions" do
    context "when customer_id is provided" do
      it "returns a success response and assigns transactions" do
        get customer_transactions_path(customer_id: customer.id)
        expect(response).to be_successful
        json_response = JSON.parse(response.body)
        expect(json_response.first["transaction_id"]).to eq(transaction.transaction_id)
      end
    end
  end

  describe "GET /customers/:customer_id/transactions/:id" do
    it "returns a success response" do
      get customer_transaction_path(customer_id: customer.id, id: transaction.id)
      expect(response).to be_successful
    end
  end
end

RSpec.describe "UserTransactions", type: :request do
  let!(:user) { User.create!(name: 'Test User', email: 'user@example.com', password: 'password') }
  let!(:customer) { Customer.create!(phone_num: '1234567890', name: 'Test Customer', password: 'password') }
  let!(:transaction) { Transaction.create!(customer_id: customer.customer_id, user_id: user.user_id, payment_method: 'credit', amount: 100.0) }

  describe "GET /users/:user_id/transactions" do
    context "when user_id is provided" do
      it "returns a success response and assigns transactions" do
        get user_transactions_path(user_id: user.id)
        expect(response).to be_successful
        json_response = JSON.parse(response.body)
        expect(json_response.first["transaction_id"]).to eq(transaction.transaction_id)
      end
    end
  end

  describe "GET /users/:user_id/transactions/:id" do
    it "returns a success response" do
      get user_transaction_path(user_id: user.id, id: transaction.id)
      expect(response).to be_successful
    end
  end

  describe "POST /users/:user_id/transactions" do
    context "with valid params" do
      let(:valid_attributes) { { payment_method: 'cash', amount: 200.0, customer_id: customer.customer_id } }

      it "creates a new Transaction" do
        expect {
          post user_transactions_path(user_id: user.id), params: { transaction: valid_attributes }
        }.to change(Transaction, :count).by(1)
      end

      it "returns a created status" do
        post user_transactions_path(user_id: user.id), params: { transaction: valid_attributes }
        expect(response).to have_http_status(:created)
        json_response = JSON.parse(response.body)
        expect(json_response["payment_method"]).to eq('cash')
      end
    end

    context "with invalid params" do
      let(:invalid_attributes) { { payment_method: nil, amount: nil, customer_id: nil } }

      it "does not create a new Transaction" do
        expect {
          post user_transactions_path(user_id: user.id), params: { transaction: invalid_attributes }
        }.to change(Transaction, :count).by(0)
      end

      it "returns an unprocessable entity status" do
        post user_transactions_path(user_id: user.id), params: { transaction: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end

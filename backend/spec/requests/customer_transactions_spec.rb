require 'rails_helper'

RSpec.describe "CustomerTransactions", type: :request do
  let!(:customer) { Customer.create!(customer_id: 'test_customer', name: 'Test Customer', password: 'password123', password_confirmation: 'password123') }
  let!(:user) { User.create!(user_id: 'test_user', name: 'Test User', email: 'testuser@example.com', password: 'password123', password_confirmation: 'password123') }
  let!(:transaction) { Transaction.create!(transaction_id: 'test_transaction', customer_id: customer.customer_id, payment_method: 'credit', amount: 100.0, user_id: user.user_id) }

  describe "GET /customers/:customer_id/transactions" do
    it "returns a list of transactions for a customer" do
      get customer_transactions_path(customer_id: customer.customer_id)
      expect(response).to be_successful
      json_response = JSON.parse(response.body)
      expect(json_response.first["transaction_id"]).to eq(transaction.transaction_id)
    end
  end

  describe "GET /customers/:customer_id/transactions/:id" do
    it "returns a single transaction for a customer" do
      get "/customers/#{customer.customer_id}/transactions/#{transaction.transaction_id}?transaction_id=#{transaction.transaction_id}"
      expect(response).to be_successful
      json_response = JSON.parse(response.body)
      expect(json_response["transaction_id"]).to eq(transaction.transaction_id)
    end
  end
end

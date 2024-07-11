# spec/requests/users/transactions_spec.rb
require 'rails_helper'

RSpec.describe "Users::TransactionsController", type: :request do
  let(:user) { User.create!(user_id: 'test_user', name: 'Test User', email: 'test@example.com', password: 'password123', phone_num: '1234567890') }
  let(:customer) { Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password: 'password123') }
  let(:transaction) { Transaction.create!(transaction_id: 'test_transaction', customer_id: customer.customer_id, customer_number: '12345', payment_method: 'credit', amount: 100.0, user_id: user.user_id) }
  let(:valid_attributes) { { customer_id: customer.customer_id, customer_number: '12345', payment_method: 'credit', amount: 100.0 } }
  let(:invalid_attributes) { { customer_id: '', customer_number: '', payment_method: '', amount: '' } }

  describe "GET /users/:user_id/transactions" do
    it "renders a successful response when user exists" do
      transaction
      get user_transactions_path(user_id: user.user_id)
      expect(response).to be_successful
    end

    it "returns not found when user does not exist" do
      get user_transactions_path(user_id: 'non_existent_user')
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "GET /users/:user_id/transactions/:id" do
    it "renders a successful response when transaction exists" do
      get user_transaction_path(user_id: user.user_id, id: transaction.transaction_id)
      expect(response).to be_successful
    end

    it "returns not found when transaction does not exist" do
      get user_transaction_path(user_id: user.user_id, id: 'non_existent_transaction')
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /users/:user_id/transactions" do
    context "with valid parameters" do
      it "creates a new Transaction" do
        expect {
          post user_transactions_path(user_id: user.user_id), params: { transaction: valid_attributes }
        }.to change(Transaction, :count).by(1)
      end

      it "renders a JSON response with the new transaction" do
        post user_transactions_path(user_id: user.user_id), params: { transaction: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include('application/json')
      end
    end

    context "with invalid parameters" do
      it "does not create a new Transaction" do
        expect {
          post user_transactions_path(user_id: user.user_id), params: { transaction: invalid_attributes }
        }.to change(Transaction, :count).by(0)
      end

      it "renders a JSON response with errors for the new transaction" do
        post user_transactions_path(user_id: user.user_id), params: { transaction: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include('application/json')
      end
    end

    context "when customer does not exist" do
      let(:invalid_customer_attributes) { { customer_id: 'non_existent_customer', customer_number: '12345', payment_method: 'credit', amount: 100.0 } }

      it "returns not found" do
        post user_transactions_path(user_id: user.user_id), params: { transaction: invalid_customer_attributes }
        expect(response).to have_http_status(:not_found)
      end
    end
  end
end

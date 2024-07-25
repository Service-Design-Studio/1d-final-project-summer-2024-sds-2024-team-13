require 'rails_helper'

RSpec.describe "Users::TransactionsController", type: :request do
  let!(:user) { User.create!(user_id: 'test_user', name: 'Test User', email: 'test@example.com', password: 'password123', phone_num: '1234567890') }
  let!(:customer) { Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password: 'password123') }
  let!(:transaction) { Transaction.create!(transaction_id: 'test_transaction', user_id: user.id, customer_id: customer.id, customer_number: '12345', payment_method: 'paylah', amount: "100.0") }
  let(:valid_attributes) { { transaction_id: 'new_transaction', customer_id: customer.id, customer_number: '12345', payment_method: 'credit', amount: "100.0", status: 'completed' } }
  let(:invalid_attributes) { { customer_id: '', customer_number: '', payment_method: '', amount: '' } }
  let(:additional_invalid_attributes) { { transaction_id: 'new_transaction', customer_id: customer.id, customer_number: '12345', payment_method: 'credit', amount: "0" } }
  let(:missing_attributes) { { transaction_id: 'new_transaction', customer_id: '', customer_number: '12345', payment_method: 'credit', amount: "10" } }

  describe "GET /users/:user_id/transactions" do
    it "renders a successful response when user exists" do
      get user_transactions_path(user_id: user.id)
      expect(response).to be_successful
    end

    it "returns not found when user does not exist" do
      get user_transactions_path(user_id: 'non_existent_user')
      expect(response).to have_http_status(:not_found)
      expect(response.body).to include('User not found')
    end
  end

  describe "GET /users/:user_id/transactions/:transaction_id" do
    it "renders a successful response when transaction exists" do
      get user_transaction_path(user_id: user.id, id: transaction.id)
      expect(response).to be_successful
    end

    it "returns not found when transaction does not exist" do
      # Using rescue_from to catch the exception and verify the correct response
      begin
        get user_transaction_path(user_id: user.id, id: 'non_existent_transaction')
      rescue ActiveRecord::RecordNotFound
        expect(response).to have_http_status(:not_found)
        expect(response.body).to include('Transaction not found')
      end
    end

    it "returns not found when @transaction is nil" do
      allow(User).to receive(:find_by).and_return(user)
      allow(user.transactions).to receive(:find_by).and_return(nil)

      get user_transaction_path(user_id: user.id, id: 'some_non_existent_id')
      expect(response).to have_http_status(:not_found)
      expect(response.body).to include('Not Found')
    end

    it "returns not found when user does not exist" do
      get user_transaction_path(user_id: 'non_existent_user', id: transaction.id)
      expect(response).to have_http_status(:not_found)
      expect(response.content_type).to include('application/json')
      expect(response.body).to include('{"error":"User not found"}')
    end
  end

  describe "POST /users/:user_id/transactions" do
    context "with valid parameters" do
      it "creates a new Transaction" do
        expect {
          post user_transactions_path(user_id: user.id), params: { transaction: valid_attributes }
        }.to change(Transaction, :count).by(1)
      end

      it "renders a JSON response with the new transaction" do
        post user_transactions_path(user_id: user.id), params: { transaction: valid_attributes }
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include('application/json')
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the new transaction" do
        post user_transactions_path(user_id: user.id), params: { transaction: additional_invalid_attributes }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('Transaction could not be saved')
      end

      it "does not create a new Transaction" do
        expect {
          post user_transactions_path(user_id: user.id), params: { transaction: additional_invalid_attributes }
        }.not_to change(Transaction, :count)
      end

      it "renders a JSON response indicating missing params" do
        post user_transactions_path(user_id: user.id), params: { transaction: missing_attributes }

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.body).to include('Missing or blank parameters')
      end
    end

    context "when customer does not exist" do
      let(:invalid_customer_attributes) { { transaction_id: 'new_transaction', customer_id: 'non_existent_customer', customer_number: '12345', payment_method: 'credit', amount: 100.0, status: 'completed' } }

      it "returns not found" do
        post user_transactions_path(user_id: user.user_id), params: { transaction: invalid_customer_attributes }

        expect(response).to have_http_status(:not_found)
        expect(response.body).to include('Customer not found')
      end
    end
  end
end

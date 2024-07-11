require 'rails_helper'

RSpec.describe "Transactions", type: :request do
  let!(:user) { User.create!(name: 'Test User', email: 'test@example.com', password: 'password') }
  let!(:customer) { Customer.create!(name: 'Test Customer', phone_num: '1234567890', password: 'password') }
  let(:valid_attributes) {
    {
      customer_id: customer.id,
      user_id: user.id,
      payee_id: 1,
      payee_number: '1234567890',
      payment_method: 'credit_card',
      amount: 100.0
    }
  }

  let(:invalid_attributes) {
    {
      customer_id: customer.id,
      user_id: user.id,
      payee_id: nil,
      payee_number: '1234567890',
      payment_method: 'credit_card',
      amount: 100.0
    }
  }

  describe "Customers::TransactionsController" do
    describe "GET /customers/:customer_id/transactions" do
      it "renders a successful response" do
        get customer_transactions_url(customer_id: customer.id)
        expect(response).to be_successful
        expect(response.content_type).to include("application/json")
      end
    end

    describe "GET /customers/:customer_id/transactions/:id" do
      it "renders a successful response" do
        transaction = Transaction.create! valid_attributes
        get customer_transaction_url(customer_id: customer.id, id: transaction.id)
        expect(response).to be_successful
      end

      it "renders a JSON response with the transaction" do
        transaction = Transaction.create! valid_attributes
        get customer_transaction_url(customer_id: customer.id, id: transaction.id), as: :json
        expect(response).to be_successful
        expect(response.content_type).to include("application/json")
        expect(response.body).to include("credit_card")
      end
    end
  end

  describe "Users::TransactionsController" do
    describe "GET /users/:user_id/transactions" do
      it "renders a successful response" do
        get user_transactions_url(user_id: user.id)
        expect(response).to be_successful
        expect(response.content_type).to include("application/json")
      end
    end

    describe "GET /users/:user_id/transactions/:id" do
      it "renders a successful response" do
        transaction = Transaction.create! valid_attributes
        get user_transaction_url(user_id: user.id, id: transaction.id)
        expect(response).to be_successful
      end

      it "renders a JSON response with the transaction" do
        transaction = Transaction.create! valid_attributes
        get user_transaction_url(user_id: user.id, id: transaction.id), as: :json
        expect(response).to be_successful
        expect(response.content_type).to include("application/json")
        expect(response.body).to include("credit_card")
      end
    end

    describe "POST /users/:user_id/transactions" do
      context "with valid parameters" do
        it "creates a new Transaction" do
          expect {
            post user_transactions_url(user_id: user.id), params: { transaction: valid_attributes }
          }.to change(Transaction, :count).by(1)
        end

        it "renders a JSON response with the new transaction" do
          post user_transactions_url(user_id: user.id), params: { transaction: valid_attributes }, as: :json
          expect(response).to have_http_status(:created)
          expect(response.content_type).to include("application/json")
          expect(response.body).to include("Transaction was successfully created.")
        end
      end

      context "with invalid parameters" do
        it "does not create a new Transaction" do
          expect {
            post user_transactions_url(user_id: user.id), params: { transaction: invalid_attributes }
          }.to change(Transaction, :count).by(0)
        end

        it "renders a response with 422 status" do
          post user_transactions_url(user_id: user.id), params: { transaction: invalid_attributes }
          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end
end

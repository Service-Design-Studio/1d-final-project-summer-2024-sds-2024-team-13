require 'rails_helper'

RSpec.describe "/transactions", type: :request do
  
  let(:valid_attributes) {
    {
      payee_id: 1,
      payee_number: '1234567890',
      payment_method: 'credit_card',
      amount: 100.0
    }
  }

  let(:invalid_attributes) {
    {
      payee_id: nil,
      payee_number: '1234567890',
      payment_method: 'credit_card',
      amount: 100.0
    }
  }

  describe "GET /index" do
    it "renders a successful response when no user_id is provided" do
      get transactions_url
      expect(response).to be_successful
      expect(response.content_type).to include("application/json")
    end

    it "renders a successful response when user_id is provided" do
      user = create(:user) # Assuming you have a User factory
      get user_transactions_url(user)
      expect(response).to be_successful
      expect(response.content_type).to include("application/json")
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      transaction = Transaction.create! valid_attributes
      get transaction_url(transaction)
      expect(response).to be_successful
    end

    it "renders a JSON response with the transaction" do
      transaction = Transaction.create! valid_attributes
      get transaction_url(transaction), as: :json
      expect(response).to be_successful
      expect(response.content_type).to include("application/json")
      expect(response.body).to include("credit_card")
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_transaction_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      transaction = Transaction.create! valid_attributes
      get edit_transaction_url(transaction)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Transaction" do
        expect {
          post transactions_url, params: { transaction: valid_attributes }
        }.to change(Transaction, :count).by(1)
      end

      it "renders a JSON response with the new transaction" do
        post transactions_url, params: { transaction: valid_attributes }, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include("application/json")
        expect(response.body).to include("Transaction was successfully created.")
      end
    end

    context "with invalid parameters" do
      it "does not create a new Transaction" do
        expect {
          post transactions_url, params: { transaction: invalid_attributes }
        }.to change(Transaction, :count).by(0)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post transactions_url, params: { transaction: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /update" do
    let(:new_attributes) {
      {
        payee_id: 2,
        payee_number: '9876543210',
        payment_method: 'debit_card',
        amount: 150.0
      }
    }

    context "with valid parameters" do
      it "updates the requested transaction" do
        transaction = Transaction.create! valid_attributes
        patch transaction_url(transaction), params: { transaction: new_attributes }
        transaction.reload
        expect(transaction.payee_id).to eq(2)
        expect(transaction.payee_number).to eq('9876543210')
        expect(transaction.payment_method).to eq('debit_card')
        expect(transaction.amount).to eq(150.0)
      end

      it "renders a JSON response with the updated transaction" do
        transaction = Transaction.create
      end
    end
  end
end


require 'rails_helper'

RSpec.describe "CustomerTransactions", type: :request do
  let!(:user) { User.create!(name: 'Test User', email: 'user@example.com', password: 'password') }
  let!(:customer) { Customer.create!(phone_num: '1234567890', name: 'Test Customer', password: 'password') }
  let!(:transaction) { Transaction.create!(customer_id: customer.customer_id, user_id: user.id, payment_method: 'credit', amount: 100.0) }

  describe "GET /customers/:customer_id/transactions" do
    it "returns a success response and assigns transactions" do
      get customer_transactions_path(customer_id: customer.id)
      expect(response).to be_successful
      expect(JSON.parse(response.body)).to eq([transaction.as_json])
    end
  end

  describe "GET /customers/:customer_id/transactions/:id" do
    it "returns a success response" do
      get customer_transaction_path(customer_id: customer.id, id: transaction.transaction_id)
      expect(response).to be_successful
      expect(JSON.parse(response.body)).to eq(transaction.as_json)
    end
  end

  describe "POST /customers/:customer_id/transactions" do
    context "with valid params" do
      let(:valid_attributes) { { payment_method: 'cash', amount: 200.0, user_id: user.id } }

      it "creates a new Transaction" do
        expect {
          post customer_transactions_path(customer_id: customer.id), params: { transaction: valid_attributes }
        }.to change(Transaction, :count).by(1)
      end

      it "redirects to the created transaction" do
        post customer_transactions_path(customer_id: customer.id), params: { transaction: valid_attributes }
        expect(response).to have_http_status(:created)
        created_transaction = Transaction.last
        expect(response.headers["Location"]).to end_with(customer_transaction_path(customer_id: customer.id, id: created_transaction.transaction_id))
      end
    end

    context "with invalid params" do
      let(:invalid_attributes) { { payment_method: nil, amount: nil, user_id: nil } }

      it "does not create a new Transaction" do
        expect {
          post customer_transactions_path(customer_id: customer.id), params: { transaction: invalid_attributes }
        }.to_not change(Transaction, :count)
      end

      it "renders an error" do
        post customer_transactions_path(customer_id: customer.id), params: { transaction: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end

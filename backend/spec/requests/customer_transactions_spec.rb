require 'rails_helper'

RSpec.describe "CustomerTransactions", type: :request do
  let!(:user) { User.create!(name: 'Test User', email: 'user@example.com', password: 'password') }
  let!(:customer) { Customer.create!(phone_num: '1234567890', name: 'Test Customer', password: 'password') }
  let!(:transaction) { Transaction.create!(customer_id: customer.customer_id, user_id: user.id, payment_method: 'credit', amount: 100.0) }

  describe "GET /customers/:customer_id/transactions" do
    context "when customer_id is provided" do
      it "returns a success response and assigns transactions" do
        get customer_customer_transactions_path(customer_id: customer.customer_id)
        expect(response).to be_successful
        expect(assigns(:transactions)).to eq([transaction])
      end
    end

    context "when customer_id is not provided" do
      it "returns a success response and assigns all transactions" do
        get customer_transactions_path
        expect(response).to be_successful
        expect(assigns(:transactions)).to eq(Transaction.all)
      end
    end
  end

  describe "GET /customers/:customer_id/transactions/:id" do
    it "returns a success response" do
      get customer_customer_transaction_path(customer_id: customer.customer_id, id: transaction.transaction_id)
      expect(response).to be_successful
    end
  end

  describe "POST /customers/:customer_id/transactions" do
    context "with valid params" do
      let(:valid_attributes) { { payment_method: 'cash', amount: 200.0, user_id: user.id } }

      it "creates a new Transaction" do
        expect {
          post customer_customer_transactions_path(customer_id: customer.customer_id), params: { transaction: valid_attributes }
        }.to change(Transaction, :count).by(1)
      end

      it "redirects to the created transaction" do
        post customer_customer_transactions_path(customer_id: customer.customer_id), params: { transaction: valid_attributes }
        expect(response).to redirect_to(customer_customer_transaction_path(customer_id: customer.customer_id, id: Transaction.last.transaction_id))
      end
    end

    context "with invalid params" do
      let(:invalid_attributes) { { payment_method: nil, amount: nil, user_id: nil } }

      it "does not create a new Transaction" do
        expect {
          post customer_customer_transactions_path(customer_id: customer.customer_id), params: { transaction: invalid_attributes }
        }.to change(Transaction, :count).by(0)
      end

      it "renders the new template" do
        post customer_customer_transactions_path(customer_id: customer.customer_id), params: { transaction: invalid_attributes }
        expect(response).to render_template(:new)
      end
    end
  end
end

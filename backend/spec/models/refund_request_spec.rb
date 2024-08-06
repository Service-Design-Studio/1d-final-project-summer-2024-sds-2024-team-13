require 'rails_helper'

RSpec.describe RefundRequest, type: :model do
  let(:customer) { Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password: 'password') }
  let(:user) { User.create!(user_id: 'test_user', name: 'Test User', email: 'testuser@example.com', password: 'password123', password_confirmation: 'password123') }
  let(:transaction) { Transaction.create!(transaction_id: 'test_transaction', customer_id: customer.customer_id, payment_method: 'credit', amount: 100.0, user_id: user.user_id) }

  subject {
    described_class.new(
      transaction_id: transaction.transaction_id,
      user_id: user.user_id,
      customer_id: customer.customer_id,
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: 'pending'
    )
  }

  describe 'associations' do
    it { should belong_to(:transaction_record).class_name('Transaction') }
    it { should belong_to(:user) }
    it { should belong_to(:customer) }
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without a transaction_id' do
      subject.transaction_id = nil
      expect(subject).to_not be_valid
    end

    it 'is not valid without a user_id' do
      subject.user_id = nil
      expect(subject).to_not be_valid
    end

    it 'is not valid without a customer_id' do
      subject.customer_id = nil
      expect(subject).to_not be_valid
    end

    it 'sets default status to pending if not provided' do
      refund_request = RefundRequest.new(
        transaction_id: transaction.transaction_id,
        user_id: user.user_id,
        customer_id: customer.customer_id
      )
      refund_request.valid?
      expect(refund_request.status).to eq('pending')
    end

    it 'validates presence of status' do
      subject.status = nil
      expect(subject).not_to be_valid
      expect(subject.errors[:status]).to include("can't be blank")
    end
  end

  describe 'callbacks' do
    it 'sets default status before validation' do
      refund_request = RefundRequest.new(
        transaction_id: transaction.transaction_id,
        user_id: user.user_id,
        customer_id: customer.customer_id
      )
      refund_request.valid?
      expect(refund_request.status).to eq('pending')
    end

    it 'generates refund_request_id before create' do
      refund_request = RefundRequest.create!(
        transaction_id: transaction.transaction_id,
        user_id: user.user_id,
        customer_id: customer.customer_id,
        expect_amount: 100.0,
        refund_amount: 50.0
      )
      expect(refund_request.refund_request_id).to be_present
    end

    it 'generates a unique refund_request_id' do
      refund_request_ids = []
      5.times do
        refund_request = RefundRequest.create!(
          transaction_id: transaction.transaction_id,
          user_id: user.user_id,
          customer_id: customer.customer_id,
          expect_amount: 100.0,
          refund_amount: 50.0
        )
        expect(refund_request_ids).not_to include(refund_request.refund_request_id)
        refund_request_ids << refund_request.refund_request_id
      end
    end

    it 'updates transaction status after save' do
      expect(transaction.status).to be_nil
      subject.save!
      expect(transaction.reload.status).to eq('pending')
    end

    it 'clears transaction status after destroy' do
      subject.save!
      subject.destroy
      expect(transaction.reload.status).to be_nil
    end
  end
end

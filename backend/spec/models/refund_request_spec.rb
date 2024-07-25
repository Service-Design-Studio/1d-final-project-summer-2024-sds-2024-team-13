require 'rails_helper'

RSpec.describe RefundRequest, type: :model do
  let(:customer) { Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password_digest: 'password') }
  let(:user) { User.create!(user_id: 'test_user', name: 'Test User', email: 'testuser@example.com', password: 'password123', password_confirmation: 'password123') }
  let(:transaction) { Transaction.create!(transaction_id: 'test_transaction', customer_id: customer.customer_id, payment_method: 'credit', amount: 100.0, user_id: user.user_id) }

  subject {
    described_class.new(
      transaction_id: transaction.transaction_id,
      sender_id: user.user_id,
      sender_type: 'User',
      recipient_id: user.user_id,
      recipient_type: 'User',
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: 'pending'
    )
  }

  describe 'associations' do
    it { should belong_to(:transaction_record).class_name('Transaction') }
    
    it 'can belong to a sender (User)' do
      subject.sender = user
      expect(subject.sender).to eq(user)
    end

    it 'can belong to a sender (Customer)' do
      subject.sender = customer
      subject.sender_type = 'Customer'
      expect(subject.sender).to eq(customer)
    end

    it 'can belong to a recipient (User)' do
      subject.recipient = user
      expect(subject.recipient).to eq(user)
    end

    it 'can belong to a recipient (Customer)' do
      subject.recipient = customer
      subject.recipient_type = 'Customer'
      expect(subject.recipient).to eq(customer)
    end
  end

  describe 'validations' do
    it 'is valid with valid attributes' do
      expect(subject).to be_valid
    end

    it 'is not valid without a transaction_id' do
      subject.transaction_id = nil
      expect(subject).to_not be_valid
    end

    it 'is not valid without a sender_id' do
      subject.sender_id = nil
      expect(subject).to_not be_valid
    end

    it 'is not valid without a recipient_id' do
      subject.recipient_id = nil
      expect(subject).to_not be_valid
    end
  end

  describe 'callbacks' do
    it 'sets default status before validation' do
      refund_request = RefundRequest.new
      refund_request.valid?
      expect(refund_request.status).to eq('pending')
    end

    it 'generates refund_request_id before create' do
      refund_request = RefundRequest.create!(
        transaction_id: transaction.transaction_id,
        sender_id: user.user_id,
        sender_type: 'User',
        recipient_id: user.user_id,
        recipient_type: 'User',
        expect_amount: 100.0,
        refund_amount: 50.0
      )
      expect(refund_request.refund_request_id).to be_present
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

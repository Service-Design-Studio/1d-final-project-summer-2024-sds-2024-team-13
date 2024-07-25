require 'rails_helper'

RSpec.describe RefundRequest, type: :model do
  before(:each) do
    @customer = Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password_digest: 'password')
    @user = User.create!(user_id: 'test_user', name: 'Test User', email: 'testuser@example.com', password: 'password123', password_confirmation: 'password123')
    @transaction = Transaction.create!(transaction_id: 'test_transaction', customer_id: @customer.customer_id, payment_method: 'credit', amount: 100.0, user_id: @user.user_id)
  end

  it "sets default status to 'pending' if not provided" do
    refund_request = RefundRequest.create!(
      transaction_id: @transaction.transaction_id,
      sender_id: @customer.id,
      sender_type: 'Customer',
      recipient_id: @user.id,
      recipient_type: 'User',
      expect_amount: 100.0,
      refund_amount: 50.0
    )
    expect(refund_request.status).to eq('pending')
  end

  it "updates transaction status after save" do
    refund_request = RefundRequest.create!(
      transaction_id: @transaction.transaction_id,
      sender_id: @customer.id,
      sender_type: 'Customer',
      recipient_id: @user.id,
      recipient_type: 'User',
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: 'approved'
    )
    expect(@transaction.reload.status).to eq('approved')
  end

  it "clears transaction status after destroy" do
    refund_request = RefundRequest.create!(
      transaction_id: @transaction.transaction_id,
      sender_id: @customer.id,
      sender_type: 'Customer',
      recipient_id: @user.id,
      recipient_type: 'User',
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: 'approved'
    )
    refund_request.destroy
    expect(@transaction.reload.status).to be_nil
  end

  it "generates a unique refund_request_id before create" do
    refund_request = RefundRequest.create!(
      transaction_id: @transaction.transaction_id,
      sender_id: @customer.id,
      sender_type: 'Customer',
      recipient_id: @user.id,
      recipient_type: 'User',
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: 'approved'
    )
    expect(refund_request.refund_request_id).to be_present
    expect(refund_request.refund_request_id.length).to eq(20)
  end
end

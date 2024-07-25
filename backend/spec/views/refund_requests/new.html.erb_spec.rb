require 'rails_helper'

RSpec.describe "refund_requests/new", type: :view do
  before(:each) do
    customer = Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password_digest: 'password')
    user = User.create!(user_id: 'test_user', name: 'Test User', email: 'testuser@example.com', password: 'password123', password_confirmation: 'password123')
    transaction = Transaction.create!(transaction_id: 'test_transaction', customer_id: customer.customer_id, payment_method: 'credit', amount: 100.0, user_id: user.user_id)

    @refund_request = RefundRequest.new(
      transaction_id: transaction.transaction_id,
      sender_id: user.user_id,
      sender_type: 'User',
      recipient_id: user.user_id,
      recipient_type: 'User',
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: 'pending'
    )

    assign(:refund_request, @refund_request)
    assign(:transaction, transaction)
    assign(:user, user)
    assign(:customer, customer)
  end

  it "renders new refund_request form" do
    render

    assert_select "form[action=?][method=?]", user_transaction_refund_request_path(@user.user_id, @transaction.transaction_id), "post" do
      assert_select "input[name=?]", "refund_request[transaction_id]"
      assert_select "input[name=?]", "refund_request[sender_id]"
      assert_select "input[name=?]", "refund_request[recipient_id]"
      assert_select "input[name=?]", "refund_request[expect_amount]"
      assert_select "input[name=?]", "refund_request[refund_amount]"
      assert_select "input[name=?]", "refund_request[status]"
    end
  end
end

require 'rails_helper'

RSpec.describe "refund_requests/index", type: :view do
  before(:each) do
    customer = Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password_digest: 'password')
    user = User.create!(user_id: 'test_user', name: 'Test User', email: 'testuser@example.com', password: 'password123', password_confirmation: 'password123')
    transaction = Transaction.create!(transaction_id: 'test_transaction', customer_id: customer.customer_id, payment_method: 'credit', amount: 100.0, user_id: user.user_id)

    assign(:refund_requests, [
      RefundRequest.create!(
        transaction_id: transaction.transaction_id,
        sender_id: user.user_id,
        sender_type: 'User',
        recipient_id: user.user_id,
        recipient_type: 'User',
        expect_amount: 100.0,
        refund_amount: 50.0,
        status: 'pending'
      ),
      RefundRequest.create!(
        transaction_id: transaction.transaction_id,
        sender_id: user.user_id,
        sender_type: 'User',
        recipient_id: user.user_id,
        recipient_type: 'User',
        expect_amount: 100.0,
        refund_amount: 50.0,
        status: 'approved'
      )
    ])

    assign(:customer, customer)
  end

  it "renders a list of refund_requests" do
    render

    expect(rendered).to have_selector('ul>li', count: 2)
    expect(rendered).to have_link('Show this refund request', href: user_transaction_refund_request_path(@customer, 'test_transaction', RefundRequest.first))
    expect(rendered).to have_text('Status: pending')
    expect(rendered).to have_text('Status: approved')
  end
end

require 'rails_helper'

RSpec.describe "refund_requests/index", type: :view do
  before(:each) do
    @customer = Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password_digest: 'password')
    @user = User.create!(user_id: 'test_user', name: 'Test User', email: 'testuser@example.com', password: 'password123', password_confirmation: 'password123')
    @transaction = Transaction.create!(transaction_id: 'test_transaction', customer_id: @customer.customer_id, payment_method: 'credit', amount: 100.0, user_id: @user.user_id)

    @refund_request1 = RefundRequest.create!(
      transaction_id: @transaction.transaction_id,
      sender_id: @user.id,
      sender_type: 'User',
      recipient_id: @user.id,
      recipient_type: 'User',
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: 'pending'
    )

    @refund_request2 = RefundRequest.create!(
      transaction_id: @transaction.transaction_id,
      sender_id: @user.id,
      sender_type: 'User',
      recipient_id: @user.id,
      recipient_type: 'User',
      expect_amount: 100.0,
      refund_amount: 50.0,
      status: 'approved'
    )

    assign(:refund_requests, [@refund_request1, @refund_request2])
    assign(:transactions, [@transaction])
    assign(:customer, @customer)
  end

  it "renders a list of refund_requests" do
    render template: "refund_requests/index"

    expect(rendered).to have_selector('ul>li', count: 1)
    expect(rendered).to have_link(@transaction.transaction_id, href: customer_transaction_path(@customer, @transaction))
    expect(rendered).to have_text('Amount: 100.0')
  end

  it "clears transaction status after a refund request is destroyed" do
    @refund_request1.destroy

    # Triggering the render again to simulate the view update after deletion
    render template: "refund_requests/index"

    expect(@transaction.reload.status).to be_nil
  end
end

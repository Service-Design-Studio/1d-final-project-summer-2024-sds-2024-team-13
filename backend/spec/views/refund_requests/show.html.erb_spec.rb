require 'rails_helper'

RSpec.describe "refund_requests/show", type: :view do
  before(:each) do
    customer = Customer.create!(customer_id: 'test_customer', name: 'Test Customer', phone_num: '1234567890', password_digest: 'password')
    user = User.create!(user_id: 'test_user', name: 'Test User', email: 'testuser@example.com', password: 'password123', password_confirmation: 'password123')
    transaction = Transaction.create!(transaction_id: 'test_transaction', customer_id: customer.customer_id, payment_method: 'credit', amount: 100.0, user_id: user.user_id)

    @refund_request = RefundRequest.create!(
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
  end

  it "renders attributes in <p>" do
    def view.edit_refund_request_path(refund_request)
      "/users/#{refund_request.sender_id}/transactions/#{refund_request.transaction_id}/refund_request/edit"
    end
    
    def view.refund_requests_path
      "/users/#{@refund_request.sender_id}/transactions/#{@refund_request.transaction_id}/refund_requests"
    end

    def view.refund_request_path(refund_request)
      "/users/#{refund_request.sender_id}/transactions/#{refund_request.transaction_id}/refund_request"
    end
    
    render
    
    expect(rendered).to have_text("Back to refund requests")
  end
end

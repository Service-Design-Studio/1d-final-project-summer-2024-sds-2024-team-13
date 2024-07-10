require 'rails_helper'

RSpec.describe "transactions/index", type: :view do
  before(:each) do
    assign(:transactions, [
      Transaction.create!(
        transaction_id: "Transaction",
        payee_id: "Payee",
        payee_number: "Payee Number",
        payment_method: "Payment Method",
        amount: 2.5
      ),
      Transaction.create!(
        transaction_id: "Transaction",
        payee_id: "Payee",
        payee_number: "Payee Number",
        payment_method: "Payment Method",
        amount: 2.5
      )
    ])
  end

  # it "renders a list of transactions" do
  #   render
  #   cell_selector = Rails::VERSION::STRING >= '7' ? 'div>p' : 'tr>td'
  #   assert_select cell_selector, text: Regexp.new("Transaction".to_s), count: 2
  #   assert_select cell_selector, text: Regexp.new("Payee".to_s), count: 2
  #   assert_select cell_selector, text: Regexp.new("Payee Number".to_s), count: 2
  #   assert_select cell_selector, text: Regexp.new("Payment Method".to_s), count: 2
  #   assert_select cell_selector, text: Regexp.new(2.5.to_s), count: 2
  # end
end

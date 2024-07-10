require 'rails_helper'

RSpec.describe "transactions/show", type: :view do
  before(:each) do
    assign(:transaction, Transaction.create!(
      transaction_id: "Transaction",
      payee_id: "Payee",
      payee_number: "Payee Number",
      payment_method: "Payment Method",
      amount: 2.5
    ))
  end

  # it "renders attributes in <p>" do
  #   render
  #   expect(rendered).to match(/Transaction/)
  #   expect(rendered).to match(/Payee/)
  #   expect(rendered).to match(/Payee Number/)
  #   expect(rendered).to match(/Payment Method/)
  #   expect(rendered).to match(/2.5/)
  # end
end

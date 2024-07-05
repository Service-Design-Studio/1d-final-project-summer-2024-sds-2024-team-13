require 'rails_helper'

RSpec.describe "transactions/show", type: :view do
  before(:each) do
    assign(:transaction, Transaction.create!(
      transactionid: "Transactionid"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Transactionid/)
  end
end

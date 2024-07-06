require 'rails_helper'

RSpec.describe "transactions/edit", type: :view do
  let(:transaction) {
    Transaction.create!(
      transaction_id: "MyString",
      payee_id: "MyString",
      payee_number: "MyString",
      payment_method: "MyString",
      amount: 1.5
    )
  }

  before(:each) do
    assign(:transaction, transaction)
  end

  it "renders the edit transaction form" do
    render

    assert_select "form[action=?][method=?]", transaction_path(transaction), "post" do

      assert_select "input[name=?]", "transaction[transaction_id]"

      assert_select "input[name=?]", "transaction[payee_id]"

      assert_select "input[name=?]", "transaction[payee_number]"

      assert_select "input[name=?]", "transaction[payment_method]"

      assert_select "input[name=?]", "transaction[amount]"
    end
  end
end

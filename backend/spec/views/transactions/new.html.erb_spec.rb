require 'rails_helper'

RSpec.describe "transactions/new", type: :view do
  before(:each) do
    assign(:transaction, Transaction.new(
      transaction_id: "MyString",
      payee_id: "MyString",
      payee_number: "MyString",
      payment_method: "MyString",
      amount: 1.5
    ))
  end

  it "renders new transaction form" do
    render
    assert_select "form[action=?][method=?]", transactions_path, "post" do
      assert_select "input[name=?]", "transaction[transaction_id]"
      assert_select "input[name=?]", "transaction[payee_id]"
      assert_select "input[name=?]", "transaction[payee_number]"
      assert_select "input[name=?]", "transaction[payment_method]"
      assert_select "input[name=?]", "transaction[amount]"
    end
  end
end

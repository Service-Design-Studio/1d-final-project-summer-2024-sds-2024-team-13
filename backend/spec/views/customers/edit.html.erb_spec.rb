require 'rails_helper'

RSpec.describe "customers/edit", type: :view do
  let(:customer) {
    Customer.create!(
      customer_id: "MyString",
      phone_num: "MyString",
      name: "MyString"
    )
  }

  before(:each) do
    assign(:customer, customer)
  end

  it "renders the edit customer form" do
    render

    assert_select "form[action=?][method=?]", customer_path(customer), "post" do

      assert_select "input[name=?]", "customer[customer_id]"

      assert_select "input[name=?]", "customer[phone_num]"

      assert_select "input[name=?]", "customer[name]"
    end
  end
end

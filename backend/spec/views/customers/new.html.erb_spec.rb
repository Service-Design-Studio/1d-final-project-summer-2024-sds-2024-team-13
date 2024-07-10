require 'rails_helper'

RSpec.describe "customers/new", type: :view do
  before(:each) do
    assign(:customer, Customer.new(
      customer_id: "MyString",
      phone_num: "MyString",
      name: "MyString"
    ))
  end

  it "renders new customer form" do
    render

    assert_select "form[action=?][method=?]", customers_path, "post" do

      assert_select "input[name=?]", "customer[customer_id]"

      assert_select "input[name=?]", "customer[phone_num]"

      assert_select "input[name=?]", "customer[name]"
    end
  end
end

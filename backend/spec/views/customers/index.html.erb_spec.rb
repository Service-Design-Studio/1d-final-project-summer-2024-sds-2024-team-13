require 'rails_helper'

RSpec.describe "customers/index", type: :view do
  before(:each) do
    assign(:customers, [
      Customer.create!(
        customer_id: "Customer",
        phone_num: "Phone Num",
        name: "Name"
      ),
      Customer.create!(
        customer_id: "Customer",
        phone_num: "Phone Num",
        name: "Name"
      )
    ])
  end

  it "renders a list of customers" do
    render
    cell_selector = Rails::VERSION::STRING >= '7' ? 'div>p' : 'tr>td'
    assert_select cell_selector, text: Regexp.new("Customer".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Phone Num".to_s), count: 2
    assert_select cell_selector, text: Regexp.new("Name".to_s), count: 2
  end
end

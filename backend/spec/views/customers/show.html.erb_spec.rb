require 'rails_helper'

RSpec.describe "customers/show", type: :view do
  before(:each) do
    assign(:customer, Customer.create!(
      customer_id: "Customer",
      phone_num: "Phone Num",
      name: "Name",
      password: "password123"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Customer/)
    expect(rendered).to match(/Phone Num/)
    expect(rendered).to match(/Name/)
  end
end

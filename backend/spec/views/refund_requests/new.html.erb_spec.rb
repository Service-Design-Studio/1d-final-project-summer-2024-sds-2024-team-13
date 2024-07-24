require 'rails_helper'

RSpec.describe "refund_requests/new", type: :view do
  before(:each) do
    assign(:refund_request, RefundRequest.new())
  end

  it "renders new refund_request form" do
    render

    assert_select "form[action=?][method=?]", refund_requests_path, "post" do
    end
  end
end

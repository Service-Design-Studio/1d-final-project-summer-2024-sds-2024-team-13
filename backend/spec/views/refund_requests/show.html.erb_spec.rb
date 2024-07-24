require 'rails_helper'

RSpec.describe "refund_requests/show", type: :view do
  before(:each) do
    assign(:refund_request, RefundRequest.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end

require 'rails_helper'

RSpec.describe "refund_requests/edit", type: :view do
  let(:refund_request) {
    RefundRequest.create!()
  }

  before(:each) do
    assign(:refund_request, refund_request)
  end

  it "renders the edit refund_request form" do
    render

    assert_select "form[action=?][method=?]", refund_request_path(refund_request), "post" do
    end
  end
end

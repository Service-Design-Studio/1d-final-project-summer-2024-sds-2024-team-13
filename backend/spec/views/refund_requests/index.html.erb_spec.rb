require 'rails_helper'

RSpec.describe "refund_requests/index", type: :view do
  before(:each) do
    assign(:refund_requests, [
      RefundRequest.create!(),
      RefundRequest.create!()
    ])
  end

  it "renders a list of refund_requests" do
    render
    cell_selector = Rails::VERSION::STRING >= '7' ? 'div>p' : 'tr>td'
  end
end

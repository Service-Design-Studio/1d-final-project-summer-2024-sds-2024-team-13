class AddReasonToRefundRequest < ActiveRecord::Migration[7.1]
  def change
    add_column :refund_requests, :request_reason, :string 
    add_column :refund_requests, :response_reason, :string
  end
end

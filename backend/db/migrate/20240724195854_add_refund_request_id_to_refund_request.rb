class AddRefundRequestIdToRefundRequest < ActiveRecord::Migration[7.1]
  def change
    add_column :refund_requests, :refund_request_id, :string
  end
end
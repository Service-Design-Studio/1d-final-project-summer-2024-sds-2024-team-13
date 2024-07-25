class AddUserIdAndCustomerIdtoRefundRequests < ActiveRecord::Migration[7.1]
  def change
    add_column :refund_requests, :user_id, :string
    add_column :refund_requests, :customer_id, :string
    add_foreign_key :refund_requests, :users, column: :user_id, primary_key: :user_id
    add_foreign_key :refund_requests, :customers, column: :customer_id, primary_key: :customer_id
  
  end
end

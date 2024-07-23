class AddTransactionIdToRefundRequests < ActiveRecord::Migration[7.1]
  def change
    add_column :refund_requests, :transaction_id, :string
    add_column :refund_requests, :status, :string
    add_column :refund_requests, :sender_id, :string
    add_column :refund_requests, :sender_type, :string
    add_column :refund_requests, :recipient_id, :string
    add_column :refund_requests, :recipient_type, :string
    add_column :refund_requests, :expect_amount, :decimal, precision: 10, scale: 2
    add_column :refund_requests, :refund_amount, :decimal, precision: 10, scale: 2

    add_foreign_key :refund_requests, :transactions, column: :transaction_id

  end
end

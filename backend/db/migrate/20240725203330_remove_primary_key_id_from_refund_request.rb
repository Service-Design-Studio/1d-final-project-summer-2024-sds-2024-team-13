class RemovePrimaryKeyIdFromRefundRequest < ActiveRecord::Migration[7.1]
  def change
    # Removing the default id column
    if column_exists?(:refund_requests, :id)
      remove_column :refund_requests, :id, :primary_key
    end
  end
end

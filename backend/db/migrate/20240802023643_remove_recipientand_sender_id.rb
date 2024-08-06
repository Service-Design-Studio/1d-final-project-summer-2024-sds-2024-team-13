class RemoveRecipientandSenderId < ActiveRecord::Migration[7.1]
  def change
    remove_column :refund_requests, :recipient_id, :string
    remove_column :refund_requests, :sender_id, :string
  end
end

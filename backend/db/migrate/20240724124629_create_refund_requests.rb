class CreateRefundRequests < ActiveRecord::Migration[7.1]
  def change
    create_table :refund_requests do |t|

      t.timestamps
    end
  end
end

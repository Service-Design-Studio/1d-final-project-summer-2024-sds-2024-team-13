class AddUserIdToTransactions < ActiveRecord::Migration[7.1]
  def change
    add_reference :transactions, :user, null: false
  end
end

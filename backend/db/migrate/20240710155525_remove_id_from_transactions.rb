class RemoveIdFromTransactions < ActiveRecord::Migration[7.1]
  def change
    remove_column :transactions, :id
  end
end

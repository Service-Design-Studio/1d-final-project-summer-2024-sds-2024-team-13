class AddCustomerIdToTransactions < ActiveRecord::Migration[7.1]
  def change
    add_column :transactions, :customer_id, :string
    add_index :transactions, :customer_id
    add_foreign_key :transactions, :customers
  end
end

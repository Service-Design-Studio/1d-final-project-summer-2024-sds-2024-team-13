class RenamePayerToCustomerInTransactions < ActiveRecord::Migration[7.1]
  def change
    rename_column :transactions, :payer_number, :customer_number
    remove_column :transactions, :payer_id
  end
end

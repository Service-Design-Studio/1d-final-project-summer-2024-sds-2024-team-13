class RenamePayeeIdToPayerIdInTransactions < ActiveRecord::Migration[7.1]
  def change
    rename_column :transactions, :payee_id, :payer_id
  end
end

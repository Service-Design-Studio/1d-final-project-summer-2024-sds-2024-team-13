class RenamePayeeNumberToPayerNumberInTransactions < ActiveRecord::Migration[7.1]
  def change
    rename_column :transactions, :payee_number, :payer_number
  end
end

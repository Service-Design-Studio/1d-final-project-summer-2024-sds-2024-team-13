class CreateTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :transactions do |t|
      t.integer :transactionID
      t.float :transactionSum
      t.integer :userID
      t.float :amount
      t.datetime :timestamp
      t.string :paymentMethod

      t.timestamps
    end
    add_index :transactions, :transactionID, unique: true
  end
end

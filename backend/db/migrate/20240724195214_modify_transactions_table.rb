class ModifyTransactionsTable < ActiveRecord::Migration[6.0]
  def change
    # Drop the existing transactions table
    drop_table :transactions, if_exists: true

    # Create the transactions table with the desired structure
    create_table :transactions, id: false do |t|
      t.string :customer_number
      t.string :payment_method
      t.decimal :amount
      t.timestamps
      t.string :user_id
      t.string :customer_id
      t.string :transaction_id, primary_key: true
    end
    add_foreign_key :transactions, :customers, column: :customer_id, primary_key: :customer_id
  end
end

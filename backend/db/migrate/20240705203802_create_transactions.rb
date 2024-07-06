class CreateTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :transactions do |t|
      t.string :transaction_id
      t.string :payee_id
      t.string :payee_number
      t.string :payment_method
      t.float :amount

      t.timestamps
    end
  end
end

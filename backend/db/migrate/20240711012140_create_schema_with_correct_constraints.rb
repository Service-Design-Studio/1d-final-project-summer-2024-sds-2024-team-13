class CreateSchemaWithCorrectConstraints < ActiveRecord::Migration[7.1]
  def change
    create_table :customers, id: false do |t|
      t.string :customer_id, primary_key: true
      t.string :name
      t.string :phone_num
      t.string :password_digest
      t.timestamps
    end

    create_table :transactions do |t|
      t.string :customer_number
      t.string :payment_method
      t.decimal :amount
      t.timestamps
      t.string :user_id
      t.string :customer_id
      t.string :transaction_id
    end

    add_foreign_key :transactions, :customers, column: :customer_id, primary_key: :customer_id
  end
end

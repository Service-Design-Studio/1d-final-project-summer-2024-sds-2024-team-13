class CreateCustomers < ActiveRecord::Migration[7.1]
  def change
    create_table :customers do |t|
      t.string :customer_id
      t.string :phone_num
      t.string :name

      t.timestamps
    end
  end
end

class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users do |t|
      t.integer :userID
      t.string :userName
      t.string :email
      t.string :phone
      t.datetime :createdAt

      t.timestamps
    end
  end
end

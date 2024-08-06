class AddForeignKeyToItems < ActiveRecord::Migration[7.1]
  def change
    add_column :items, :user_id, :string
    add_foreign_key :items, :users, column: :user_id, primary_key: :user_id
  end
end

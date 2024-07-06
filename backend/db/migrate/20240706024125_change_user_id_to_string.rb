class ChangeUserIdToString < ActiveRecord::Migration[7.1]
  def change
    change_column :transactions, :user_id, :string
  end
end

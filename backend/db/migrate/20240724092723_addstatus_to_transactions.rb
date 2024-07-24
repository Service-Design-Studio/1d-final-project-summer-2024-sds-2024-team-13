class AddstatusToTransactions < ActiveRecord::Migration[7.1]
 
  def change
    add_foreign_key :transactions, :users, column: :user_id, primary_key: :user_id
    add_column :transactions, :status, :string
  end
end
  
  
 
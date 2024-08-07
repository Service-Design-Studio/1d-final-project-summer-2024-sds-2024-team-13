class AdditemsToTransaction < ActiveRecord::Migration[7.1]
  def change
    add_column :transactions, :items, :text
  end
end

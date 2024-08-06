class AddFavouriteToItems < ActiveRecord::Migration[7.1]
  def change
    add_column :items, :favourite, :boolean
  end
end

class AddEarningsCutoffTimeToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :earnings_cutoff_time, :time, default: "00:00"
  end
end

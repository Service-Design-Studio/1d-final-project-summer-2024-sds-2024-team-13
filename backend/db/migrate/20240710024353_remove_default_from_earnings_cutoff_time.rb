class RemoveDefaultFromEarningsCutoffTime < ActiveRecord::Migration[7.1]
  def change
    change_column_default :users, :earnings_cutoff_time, from: "2000-01-01 00:00:00", to: nil
  end
end

class AddSettingsAndDailyEarningsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :endDayTiming, :string
    add_column :users, :daily_earnings, :decimal
  end
end

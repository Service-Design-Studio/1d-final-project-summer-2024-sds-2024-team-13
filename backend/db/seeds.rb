# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Transaction.delete_all

Transaction.create([
    {
    transactionID: 1,
    transactionSum: 200.50,
    userID: 101,
    amount: 150.00,
    timestamp: DateTime.now,
    paymentMethod: "PayNow"
  },
  {
    transactionID: 2,
    transactionSum: 450.75,
    userID: 102,
    amount: 300.25,
    timestamp: DateTime.now,
    paymentMethod: "PayLah"
  }
])

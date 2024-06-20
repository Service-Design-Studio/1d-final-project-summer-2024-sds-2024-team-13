json.extract! transaction, :id, :transactionID, :transactionSum, :userID, :amount, :timestamp, :paymentMethod, :created_at, :updated_at
json.url transaction_url(transaction, format: :json)

json.extract! transaction, :id, :transactionid, :created_at, :updated_at
json.url transaction_url(transaction, format: :json)

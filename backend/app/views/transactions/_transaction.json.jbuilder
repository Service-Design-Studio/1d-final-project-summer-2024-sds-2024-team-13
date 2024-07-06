json.extract! transaction,:id, :transaction_id, :payee_id, :payee_number, :payment_method, :amount, :created_at, :updated_at
json.url transaction_url(transaction, format: :json)

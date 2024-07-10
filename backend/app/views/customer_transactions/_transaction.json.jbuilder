json.extract! transaction,:id, :transaction_id, :payee_id, :payee_number, :payment_method, :amount, :created_at, :updated_at
json.url customer_transaction_url(@customer, transaction, format: :json)


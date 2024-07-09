json.extract! customer, :id, :customer_id, :phone_num, :name, :created_at, :updated_at
json.url customer_url(customer, format: :json)

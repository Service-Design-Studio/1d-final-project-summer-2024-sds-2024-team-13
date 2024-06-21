json.extract! user, :id, :userID, :userName, :email, :phone, :createdAt, :created_at, :updated_at
json.url user_url(user, format: :json)

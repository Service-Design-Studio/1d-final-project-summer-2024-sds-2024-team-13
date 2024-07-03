# Clear existing data
User.delete_all

# Create sample users
users = [
  { name: 'John Doe', phone_num: '123-456-7890' },
  { name: 'Jane Smith', phone_num: '098-765-4321' },
  { name: 'Alice Johnson', phone_num: '555-123-4567' }
]

users.each do |user_data|
  User.create!(
    name: user_data[:name],
    phone_num: user_data[:phone_num],
    # user_id will be generated automatically
  )
end

puts "Seed data inserted successfully"
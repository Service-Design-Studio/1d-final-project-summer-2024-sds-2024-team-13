class Transaction < ApplicationRecord
    self.primary_key = 'transaction_id'
    belongs_to :customer, primary_key: 'customer_id', foreign_key: 'customer_id', optional: true
    belongs_to :user, primary_key: 'user_id', foreign_key: 'user_id'
    
    validates :customer_id, presence: true
    validates :amount, numericality: { greater_than: 0 }
end

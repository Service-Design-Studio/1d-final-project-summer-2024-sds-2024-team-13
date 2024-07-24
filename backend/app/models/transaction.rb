class Transaction < ApplicationRecord
    self.primary_key = 'transaction_id'
    belongs_to :customer, primary_key: 'customer_id', foreign_key: 'customer_id', optional: true
    belongs_to :user, primary_key: 'user_id', foreign_key: 'user_id'
    before_create :generate_transaction_id
 
    
    private
    def generate_transaction_id
        self.transaction_id = loop do
          random_id = SecureRandom.hex(10)
          Rails.logger.info "Generated requestrefund_id: #{random_id}"
          break random_id unless self.class.exists?(transaction_id: random_id)
        end
    end
    validates :customer_id, presence: true
    validates :amount, numericality: { greater_than: 0 }
end

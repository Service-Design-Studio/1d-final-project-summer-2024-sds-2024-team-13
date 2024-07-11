class Transaction < ApplicationRecord
    belongs_to :customer, primary_key: 'customer_id', foreign_key: 'customer_id', optional: true
    belongs_to :user, primary_key: 'user_id', foreign_key: 'user_id'
    self.primary_key = 'transaction_id'
    
    
    private
    def generate_transaction_id
        self.id = loop do
          random_id = SecureRandom.hex(10)
          Rails.logger.info "Generated transaction_id: #{random_id}"
          break random_id unless self.class.exists?(transaction_id: random_id)
        end
    end
    
end

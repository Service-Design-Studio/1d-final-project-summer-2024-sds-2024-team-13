class Transaction < ApplicationRecord
    belongs_to :user
    before_create :generate_transaction_id
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

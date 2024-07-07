class User < ApplicationRecord
    has_secure_password
    
    has_many :transactions
    before_create :generate_user_id
    self.primary_key = 'user_id'
    
    
    private
    def generate_user_id
        self.user_id = loop do
          random_id = SecureRandom.hex(10)
          Rails.logger.info "Generated user_id: #{random_id}"
          break random_id unless self.class.exists?(user_id: random_id)
        end
    end
end

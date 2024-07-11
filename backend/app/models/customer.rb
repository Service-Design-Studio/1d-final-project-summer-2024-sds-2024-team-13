class Customer < ApplicationRecord
    has_secure_password
    has_many :transactions , primary_key: "customer_id", foreign_key: "customer_id", dependent: :destroy
    before_create :generate_customer_id
    self.primary_key = 'customer_id'
     
    private
    def generate_customer_id
        self.customer_id = loop do
          random_id = SecureRandom.hex(10)
          Rails.logger.info "Generated customer_id: #{random_id}"
          break random_id unless self.class.exists?(customer_id: random_id)
        end
    end
end


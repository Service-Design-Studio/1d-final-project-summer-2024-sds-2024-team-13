class RefundRequest < ApplicationRecord
  belongs_to :transaction, foreign_key: :transaction_id
  belongs_to :sender, polymorphic: true   #sender pointer :sender pointer defined as polymorphic, can point to multiple models e.g customer or user
  belongs_to :recipient, polymorphic: true  #:recipient pointer defined as polymorphic
  self.primary_key = 'id'
     
  private
    def generate_refundrequest_id
        self.id = loop do
          random_id = SecureRandom.hex(10)
          Rails.logger.info "Generated customer_id: #{random_id}"
          break random_id unless self.class.exists?(id: random_id)
        end
    end
end

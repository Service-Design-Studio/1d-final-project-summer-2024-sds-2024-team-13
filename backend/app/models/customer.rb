class Customer < ApplicationRecord
    has_secure_password
    has_many :transactions , primary_key: "customer_id", foreign_key: "customer_id", dependent: :destroy
    has_many :sent_refund_requests, as: :sender, class_name: 'RefundRequest'   #:sent_refund_requests method created, sender defined, which tells rails :sender is polymorphic(can be customer or user)
    #customer has many sent_refund_requests as sender, which fetches all RefundRequests for customer being the sender
    #:sender is defined as polymorphic in RefundRequest model, activeRecord magic lets :sender to be used in this Customer model

    #this means that sent_request_refund can fetch RequestRefund model from db if :sender inside RequestRefund model is Customer
    has_many :received_refund_requests, as: :recipient, class_name: 'RefundRequest'
    #customer has many received_refund_requests as recipient, which fetches all RefundRequests for customer being the recipient
    
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


class RefundRequest < ApplicationRecord
  belongs_to :transaction_record, foreign_key: :transaction_id, class_name: 'Transaction'
  belongs_to :user , foreign_key: :user_id
  belongs_to :customer, foreign_key: :customer_id
  # belongs_to :sender, polymorphic: true   #sender pointer :sender pointer defined as polymorphic, can point to multiple models e.g customer or user
  # belongs_to :recipient, polymorphic: true  #:recipient pointer defined as polymorphic
  after_save :update_transaction_status
  after_destroy :clear_transaction_status
  before_create :generate_refundrequest_id
  before_validation :set_default_status, on: :create
  validates :status, presence: true #Added by hc
  self.primary_key = 'refund_request_id'
  private

  def set_default_status
    self.status ||= 'pending'
  end

  private

  def update_transaction_status
    transaction_record.update(status: self.status)
  end

  def clear_transaction_status
    transaction_record.update(status: nil) # or some default status
  end   

  private
    def generate_refundrequest_id
        self.refund_request_id = loop do
          random_id = SecureRandom.hex(10)
          Rails.logger.info "Generated requestrefund_id: #{random_id}"
          break random_id unless self.class.exists?(refund_request_id: random_id)
        end
    end
end

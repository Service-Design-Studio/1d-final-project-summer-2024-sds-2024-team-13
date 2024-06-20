class Transaction < ApplicationRecord
    validates :transactionID, presence: true
    validates :transactionSum, presence: true, numericality: true
    validates :userID, presence: true
    validates :amount, presence: true, numericality: true
    validates :timestamp, presence: true
    validates :paymentMethod, presence: true
  end
  
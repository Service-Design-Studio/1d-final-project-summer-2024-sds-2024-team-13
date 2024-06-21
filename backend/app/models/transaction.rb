class Transaction < ApplicationRecord
    belongs_to :user, foreign_key: 'userID'
    validates :transactionID, :transactionSum, :userID, :amount, :timestamp, :paymentMethod, presence: true
  end
  
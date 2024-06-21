class User < ApplicationRecord
    self.primary_key = 'userID'
    has_many :transactions, foreign_key: 'userID'
    
  
    # Add any necessary validations
    validates :userName, :email, :phone, :createdAt, presence: true
  end
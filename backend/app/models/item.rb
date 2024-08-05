class Item < ApplicationRecord
  belongs_to :user, foreign_key: :user_id
  has_one_attached :image
  validates :name, presence: true
  validates :price, presence: true


end
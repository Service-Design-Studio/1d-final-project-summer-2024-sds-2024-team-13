class Item < ApplicationRecord
  belongs_to :user, foreign_key: :user_id
  has_one_attached :image

  def image_url
    Rails.application.routes.url_helpers.url_for(image) if image.attached?
  end
end
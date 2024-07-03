class User < ApplicationRecord
    before_create :generate_user_id

    private
    def generate_user_id
        self.user_id = loop do
          random_id = SecureRandom.hex(10)
          break random_id unless self.class.exists?(user_id: random_id)
        end
    end
end

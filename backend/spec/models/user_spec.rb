require 'rails_helper'

RSpec.describe User, type: :model do
  # Test associations
  it { is_expected.to have_many(:transactions).with_primary_key('user_id').with_foreign_key('user_id') }

  # Test secure password
  it { is_expected.to have_secure_password }

  # Test before_create callback
  describe 'before_create callback' do
    it 'generates a unique user_id' do
      user = User.new(email: 'test@example.com', password: 'password', password_confirmation: 'password')
      expect(user.user_id).to be_nil
      user.save
      expect(user.user_id).not_to be_nil
      expect(user.user_id).to be_a(String)
      expect(user.user_id.length).to eq(20) # SecureRandom.hex(10) generates a string with length 20
    end

    it 'ensures user_id uniqueness' do
      existing_user = User.create(email: 'existing@example.com', password: 'password', password_confirmation: 'password')
      new_user = User.new(email: 'new@example.com', password: 'password', password_confirmation: 'password')
      expect(new_user.user_id).to be_nil
      new_user.save
      expect(new_user.user_id).not_to eq(existing_user.user_id)
    end
  end
end

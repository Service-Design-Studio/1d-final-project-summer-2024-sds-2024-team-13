require 'rails_helper'

RSpec.describe Transaction, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'before_create callback' do
    let(:user) { User.create(email: 'test@example.com', password: 'password') } # Manually creating a user
    let(:transaction) { Transaction.new(user: user) }

    it 'generates a unique transaction_id' do
      transaction.save
      expect(transaction.transaction_id).to be_present
      expect(transaction.transaction_id).to be_a(String)
    end

    it 'generates a different transaction_id for each transaction' do
      transaction1 = Transaction.create(user: user)
      transaction2 = Transaction.create(user: user)
      expect(transaction1.transaction_id).not_to eq(transaction2.transaction_id)
    end
  end
end

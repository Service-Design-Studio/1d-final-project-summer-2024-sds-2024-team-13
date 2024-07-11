require 'rails_helper'

RSpec.describe Customer, type: :model do
  describe "validations" do
    it "is valid with valid attributes" do
      customer = Customer.new(
        customer_id: 'C123',
        phone_num: '1234567890',
        name: 'Test Customer',
        password: 'password123'
      )
      expect(customer).to be_valid
    end

    it "is not valid without a customer_id" do
      customer = Customer.new(customer_id: nil)
      expect(customer).not_to be_valid
    end

    it "is not valid without a phone_num" do
      customer = Customer.new(phone_num: nil)
      expect(customer).not_to be_valid
    end

    it "is not valid without a name" do
      customer = Customer.new(name: nil)
      expect(customer).not_to be_valid
    end

    it "is not valid without a password" do
      customer = Customer.new(password: nil)
      expect(customer).not_to be_valid
    end
  end

  describe "callbacks" do
    it "generates a customer_id before create" do
      customer = Customer.create!(
        phone_num: '1234567890',
        name: 'Test Customer',
        password: 'password123'
      )
      expect(customer.customer_id).not_to be_nil
    end
  end

  describe "associations" do
    it { should have_many(:transactions).with_primary_key('customer_id').with_foreign_key('customer_id') }
  end
end

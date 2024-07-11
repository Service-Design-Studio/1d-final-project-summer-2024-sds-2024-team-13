require 'rails_helper'

RSpec.describe "/customers", type: :request do

  let(:valid_attributes) {
    { customer_id: 'C123', phone_num: '1234567890', name: 'Test Customer', password: 'password123' }
  }

  let(:invalid_attributes) {
    { customer_id: nil, phone_num: nil, name: nil, password: nil }
  }

  describe "GET /index" do
    it "renders a successful response" do
      Customer.create! valid_attributes
      get customers_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      customer = Customer.create! valid_attributes
      get customer_url(customer)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Customer" do
        expect {
          post customers_url, params: { customer: valid_attributes }, as: :json
        }.to change(Customer, :count).by(1)
      end

      it "renders a JSON response with the new customer" do
        post customers_url, params: { customer: valid_attributes }, as: :json
        expect(response).to have_http_status(:created)
        expect(response.content_type).to include('application/json')
        expect(response.location).to eq(customer_url(Customer.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Customer" do
        expect {
          post customers_url, params: { customer: invalid_attributes }, as: :json
        }.to change(Customer, :count).by(0)
      end

      it "renders a JSON response with errors for the new customer" do
        post customers_url, params: { customer: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include('application/json')
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        { name: 'Updated Customer' }
      }

      it "updates the requested customer" do
        customer = Customer.create! valid_attributes
        patch customer_url(customer), params: { customer: new_attributes }
        customer.reload
        expect(customer.name).to eq('Updated Customer')
      end

      it "renders a JSON response with the customer" do
        customer = Customer.create! valid_attributes
        patch customer_url(customer), params: { customer: new_attributes }, as: :json
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to include('application/json')
      end
    end

    context "with invalid parameters" do
      it "does not update the customer" do
        customer = Customer.create! valid_attributes
        expect {
          patch customer_url(customer), params: { customer: invalid_attributes }, as: :json
          customer.reload
        }.not_to change(customer, :name)
      end

      it "renders a JSON response with errors for the customer" do
        customer = Customer.create! valid_attributes
        patch customer_url(customer), params: { customer: invalid_attributes }, as: :json
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to include('application/json')
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested customer" do
      customer = Customer.create! valid_attributes
      expect {
        delete customer_url(customer)
      }.to change(Customer, :count).by(-1)
    end

    it "redirects to the customers list" do
      customer = Customer.create! valid_attributes
      delete customer_url(customer)
      expect(response).to have_http_status(:no_content)
    end
  end
end

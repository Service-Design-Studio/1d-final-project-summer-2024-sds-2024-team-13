require 'rails_helper'

RSpec.describe Customers::RefundRequestsController, type: :routing do
  describe 'routing' do
    it 'routes to #index' do
      expect(get: '/customers/1/refund_requests').to route_to('customers/refund_requests#index', customer_id: '1')
    end

    it 'routes to #new' do
      expect(get: '/customers/1/transactions/1/refund_request/new').to route_to('customers/refund_requests#new', customer_id: '1', transaction_id: '1')
    end

    it 'routes to #show' do
      expect(get: '/customers/1/transactions/1/refund_request').to route_to('customers/refund_requests#show', customer_id: '1', transaction_id: '1')
    end

    it 'routes to #edit' do
      expect(get: '/customers/1/transactions/1/refund_request/edit').to route_to('customers/refund_requests#edit', customer_id: '1', transaction_id: '1')
    end

    it 'routes to #create' do
      expect(post: '/customers/1/transactions/1/refund_request').to route_to('customers/refund_requests#create', customer_id: '1', transaction_id: '1')
    end

    it 'routes to #update via PUT' do
      expect(put: '/customers/1/transactions/1/refund_request').to route_to('customers/refund_requests#update', customer_id: '1', transaction_id: '1')
    end

    it 'routes to #update via PATCH' do
      expect(patch: '/customers/1/transactions/1/refund_request').to route_to('customers/refund_requests#update', customer_id: '1', transaction_id: '1')
    end

    it 'routes to #destroy' do
      expect(delete: '/customers/1/transactions/1/refund_request').to route_to('customers/refund_requests#destroy', customer_id: '1', transaction_id: '1')
    end

    it 'routes to #update_status' do
      expect(patch: '/customers/1/transactions/1/refund_request/update_status').to route_to('customers/refund_requests#update_status', customer_id: '1', transaction_id: '1')
    end
  end
end

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import RefundRequest from '../components/refunds/RefundRequest';
import RefundDetails from '../components/refunds/RefundDetails';
import RefundScreen from '../components/refunds/RefundScreen';
import { AuthProvider } from '../context/AuthContext';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn()
}));

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <Router>
      <AuthProvider>
        {ui}
      </AuthProvider>
    </Router>
  );
};
const mockTransaction = {
  transaction_id: '12345',
  amount: '100.00',
  user_id: 'user123',
  user_name: 'John Doe',
  customer_number: '9876543210',
  created_at: '2023-07-10T10:00:00Z'
};
const mockRefund1 = {
  transaction_id: '12345',
  refund_request_id: '67890',
  status: 'pending',
  refund_amount: '100.00',
  updated_at: '2023-07-10T10:00:00Z'
};

const mockRefund2 = {
  transaction_id: '12345',
  refund_request_id: '67891',
  status: 'REJECTED',
  refund_amount: '100.00',
  created_at: '2023-07-10T10:00:00Z'
};

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [mockRefund1, mockRefund2] });
  useLocation.mockReturnValue({
    state: { transaction: mockTransaction, refund: mockRefund1 }
  });
});

test('Boundary Case: Requesting a refund for the exact amount of the transaction', async () => {
  renderWithRouter(<RefundRequest />, { route: '/refund' });

  fireEvent.change(screen.getByTestId('expected-payment-input'), { target: { value: '0.00' } });
  fireEvent.blur(screen.getByTestId('expected-payment-input'));
  fireEvent.change(screen.getByTestId('expected-refund-input'), { target: { value: '100.00' } });
  fireEvent.blur(screen.getByTestId('expected-refund-input'));
  fireEvent.change(screen.getByTestId('refund-reason-input'), { target: { value: 'Reason for refund' } });
  fireEvent.click(screen.getByTestId('refund-submit-button'));

  await waitFor(() => {
    expect(window.location.pathname).toBe('/refund');
  });
});



test('Negative Case: Requesting a refund with invalid refund amount', async () => {
  renderWithRouter(<RefundRequest />, { route: '/refund' });

  fireEvent.change(screen.getByTestId('expected-payment-input'), { target: { value: '0.00' } });
  fireEvent.blur(screen.getByTestId('expected-payment-input'));
  fireEvent.change(screen.getByTestId('expected-refund-input'), { target: { value: '200.00' } }); // More than transaction amount
  fireEvent.blur(screen.getByTestId('expected-refund-input'));
  fireEvent.change(screen.getByTestId('refund-reason-input'), { target: { value: 'Reason for refund' } });
  fireEvent.click(screen.getByTestId('refund-submit-button'));

  await waitFor(() => {
    expect(screen.getByTestId('refund-submit-button')).toBeDisabled();
  });
});

test('Negative Case: Requesting a refund with invalid payment amount', async () => {
  renderWithRouter(<RefundRequest />, { route: '/refund' });

  fireEvent.change(screen.getByTestId('expected-payment-input'), { target: { value: '200.00' } }); // Missing expected payment
  fireEvent.blur(screen.getByTestId('expected-payment-input'));
  fireEvent.change(screen.getByTestId('expected-refund-input'), { target: { value: '0' } });
  fireEvent.blur(screen.getByTestId('expected-refund-input'));
  fireEvent.change(screen.getByTestId('refund-reason-input'), { target: { value: '' } }); // Missing reason
  fireEvent.click(screen.getByTestId('refund-submit-button'));

  await waitFor(() => {
    expect(screen.getByTestId('refund-submit-button')).toBeDisabled();;
  });
});

test('Cancel Refund Request', async () => {
  axios.delete.mockResolvedValue({ status: 200 });

  renderWithRouter(<RefundDetails />, { route: '/refunds' });

  fireEvent.click(screen.getByTestId('cancel-request-button'));

  await waitFor(() => {
    expect(window.location.pathname).toBe('/refunds');
  });
});

test('Refund Request not seen on any of the Tabs in Requested Refund View', async () => {
  renderWithRouter(<RefundScreen />, { route: '/refunds' });

  fireEvent.click(screen.getByTestId('pending-tab'));
  expect(screen.queryByText("Waiting for merchant's approval")).toBeNull();

  fireEvent.click(screen.getByTestId('refunded-tab'));
  expect(screen.queryByText("Payment Refunded")).toBeNull();

  fireEvent.click(screen.getByTestId('rejected-tab'));
  expect(screen.queryByText("Request Rejected")).toBeNull();
});



import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import RefundRequest from '../components/refunds/RefundRequest';
import RefundScreen from '../components/refunds/RefundScreen';
import RefundDetails from '../components/refunds/RefundDetails';
import RefundRequestNav from '../components/refunds/OLDRefundRequestNav';
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

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [mockTransaction] });
  useLocation.mockReturnValue({
    state: { transaction: mockTransaction }
  });
});

test('Boundary Case: Requesting a refund for the exact amount of the transaction', async () => {
  renderWithRouter(<RefundRequest />, { route: '/refund' });

  fireEvent.change(screen.getByTestId('refund-request-expected-payment'), { target: { value: '0.00' } });
  fireEvent.blur(screen.getByTestId('refund-request-expected-payment'));
  fireEvent.change(screen.getByTestId('refund-request-amount-to-be-refunded'), { target: { value: '100.00' } });
  fireEvent.blur(screen.getByTestId('refund-request-amount-to-be-refunded'));
  fireEvent.change(screen.getByTestId('refund-request-reasons'), { target: { value: 'Reason for refund' } });
  fireEvent.click(screen.getByTestId('refund-request-submit-button'));

  await waitFor(() => {
    expect(window.location.pathname).toBe('/refund');
  });
});

test('Negative Case: Requesting a refund for a non-existent transaction', async () => {
    // Mock useLocation to return no transaction state
    useLocation.mockReturnValue({ state: {} });
  
    renderWithRouter(<RefundRequest />, { route: '/refund' });
  
    await waitFor(() => {
      expect(screen.getByTestId('no-transaction-error')).toHaveTextContent('Transaction details not available');
    });
  });

test('Negative Case: Requesting a refund for an amount greater than the transaction amount', async () => {
  renderWithRouter(<RefundRequest />, { route: '/refund' });

  fireEvent.change(screen.getByTestId('refund-request-expected-payment'), { target: { value: '0.00' } });
  fireEvent.blur(screen.getByTestId('refund-request-expected-payment'));
  fireEvent.change(screen.getByTestId('refund-request-amount-to-be-refunded'), { target: { value: '200.00' } });
  fireEvent.blur(screen.getByTestId('refund-request-amount-to-be-refunded'));
  fireEvent.change(screen.getByTestId('refund-request-reasons'), { target: { value: 'Reason for refund' } });
  fireEvent.click(screen.getByTestId('refund-request-submit-button'));

  await waitFor(() => {
    expect(screen.getByTestId('refund-request-submit-button')).toBeDisabled();
  });
});

test('Negative Case: Requesting a refund with invalid payment amount', async () => {
  renderWithRouter(<RefundRequest />, { route: '/refund' });

  fireEvent.change(screen.getByTestId('refund-request-expected-payment'), { target: { value: '200.00' } });
  fireEvent.blur(screen.getByTestId('refund-request-expected-payment'));
  fireEvent.change(screen.getByTestId('refund-request-amount-to-be-refunded'), { target: { value: '0.00' } });
  fireEvent.blur(screen.getByTestId('refund-request-amount-to-be-refunded'));
  fireEvent.change(screen.getByTestId('refund-request-reasons'), { target: { value: '' } });
  fireEvent.click(screen.getByTestId('refund-request-submit-button'));

  await waitFor(() => {
    expect(screen.getByTestId('refund-request-submit-button')).toBeDisabled();
  });
});  

test('Negative Case: Requesting a refund when the system is down (e.g., Network Error)', async () => {
  axios.post.mockRejectedValue(new Error('Network Error'));

  renderWithRouter(<RefundRequest />, { route: '/refund' });

  fireEvent.change(screen.getByTestId('refund-request-expected-payment'), { target: { value: '0.00' } });
  fireEvent.blur(screen.getByTestId('refund-request-expected-payment'));
  fireEvent.change(screen.getByTestId('refund-request-amount-to-be-refunded'), { target: { value: '50.00' } });
  fireEvent.blur(screen.getByTestId('refund-request-amount-to-be-refunded'));
  fireEvent.change(screen.getByTestId('refund-request-reasons'), { target: { value: 'Reason for refund' } });
  fireEvent.click(screen.getByTestId('refund-request-submit-button'));

  await waitFor(() => {
    expect(screen.getByTestId('error-message')).toHaveTextContent('Failed.');
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


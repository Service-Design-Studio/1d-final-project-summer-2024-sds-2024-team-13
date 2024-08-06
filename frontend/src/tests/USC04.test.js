import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
import RefundReview from '../components/refunds/RefundReview';
import RefundScreen from '../components/refunds/RefundScreen';
import RefundRequest from '../components/refunds/RefundRequest';
import { AuthProvider } from '../context/AuthContext';
import axios from 'axios';

jest.mock('axios');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn()
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
  amount: '10000.00', // Large amount for boundary case
  user_id: 'user123',
  user_name: 'John Doe',
  customer_number: '9876543210',
  created_at: '2023-07-10T10:00:00Z'
};

const mockRefundRequest = {
  transaction_id: '12345',
  refund_request_id: '67890',
  status: 'pending',
  refund_amount: '10000.00',
  updated_at: '2023-07-10T10:00:00Z'
};

beforeEach(() => {
  axios.get.mockResolvedValue({ data: [mockTransaction] });
  useLocation.mockReturnValue({
    state: { transaction: mockTransaction, refund: mockRefundRequest }
  });
});

test('Boundary Case: Approving a refund request for a large amount', async () => {
  axios.patch.mockResolvedValue({ data: { status: 'APPROVED' } });

  renderWithRouter(<RefundReview />, { route: '/refund' });

  fireEvent.click(screen.getByTestId('accept-button'));

  await waitFor(() => {
    expect(window.location.pathname).toBe('/refund');
  });

  renderWithRouter(<RefundScreen />, { route: '/refund' });

  fireEvent.click(screen.getByTestId('refunded-tab'));
  await waitFor(() => {
    expect(screen.getByText((content, element) => content.includes('Approved'))).toBeInTheDocument();
  });
});

test('Negative Case: Requesting a refund for a non-existent transaction', async () => {
  useLocation.mockReturnValue({ state: {} });

  renderWithRouter(<RefundRequest />, { route: '/refund' });

  await waitFor(() => {
    expect(screen.getByTestId('no-transaction-error')).toHaveTextContent('Transaction details not available');
  });
});

test('Negative Case: Unable to Decline Refund Request with missing rejection reason', async () => {
  renderWithRouter(<RefundReview />, { route: '/refunds/review' });

  fireEvent.click(screen.getByTestId('decline-button'));

  await waitFor(() => {
    expect(screen.getByTestId('refund-reject-overlay')).toBeVisible();
  });

  fireEvent.change(screen.getByTestId('reject-message-input'), { target: { value: '' } });
  fireEvent.blur(screen.getByTestId('reject-message-input'));

  expect(screen.getByTestId('reject-confirm-button')).toBeDisabled();
});

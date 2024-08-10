import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HistoryScreen from '../screens/HistoryScreen';
import { AuthProvider } from '../context/AuthContext';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';

// Register all necessary Chart.js components
Chart.register(...registerables);

jest.mock('axios');

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const originalModule = jest.requireActual('react-router-dom');
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

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

const generateMockTransactions = (num) => {
  return Array.from({ length: num }, (_, idx) => ({
    transaction_id: idx + 1,
    amount: (Math.random() * 1000).toFixed(2),
    created_at: `2024-01-${String(idx + 1).padStart(2, '0')}T00:00:00Z`,
    payment_method: idx % 2 === 0 ? 'PayLah' : 'PayNow',
    customer_number: `1234${idx}`,
    status: idx % 3 === 0 ? 'Completed' : idx % 3 === 1 ? 'Pending' : 'Refunded'
  }));
};

describe('UC_02: View Transaction History and Insights', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockReset();
  });

  test('Boundary Case: Viewing transaction history with a large number of transactions', async () => {
    const mockTransactions = generateMockTransactions(1000);
    axios.get.mockResolvedValueOnce({ data: mockTransactions });

    renderWithRouter(<HistoryScreen />, { route: '/history' });

    expect(axios.get).toHaveBeenCalledTimes(1);

    const transactions = await screen.findAllByTestId(/transaction-card-/);
    expect(transactions).toHaveLength(mockTransactions.length);

    mockTransactions.forEach((transaction, index) => {
      expect(transactions[index]).toHaveTextContent(transaction.amount);
      expect(transactions[index]).toHaveTextContent(new Date(transaction.created_at).toLocaleDateString());
      expect(transactions[index]).toHaveTextContent(transaction.payment_method.toUpperCase());
    });
  });

  test('Negative Case: No transactions available to display', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    renderWithRouter(<HistoryScreen />, { route: '/history' });

    expect(axios.get).toHaveBeenCalledTimes(1);

    const noTransactionsMessage = await screen.findByText('No Transactions Found');
    expect(noTransactionsMessage).toBeInTheDocument();
  });

  test('Negative Case: Invalid date range for the statistics graph', async () => {
    axios.get.mockResolvedValueOnce({ data: generateMockTransactions(10) });

    renderWithRouter(<HistoryScreen />, { route: '/history' });

    fireEvent.change(screen.getByTestId('start-date-picker'), { target: { value: '2024-02-01' } });
    fireEvent.change(screen.getByTestId('end-date-picker'), { target: { value: '2024-01-01' } });

    fireEvent.click(screen.getByTestId('apply-date-range-button'));

    const errorMessage = await screen.findByText('End date must be after start date');
    expect(errorMessage).toBeInTheDocument();
  });

  test('Negative Case: System failure in retrieving transaction data (e.g., database connection issue)', async () => {
    axios.get.mockRejectedValueOnce(new Error('Database connection error'));

    renderWithRouter(<HistoryScreen />, { route: '/history' });

    const errorNotification = await screen.findByText('Failed to fetch transactions');
    expect(errorNotification).toBeInTheDocument();
  });

  test('Display transaction details on tapping a transaction', async () => {
    const mockTransactions = generateMockTransactions(10);
    axios.get.mockResolvedValueOnce({ data: mockTransactions });

    renderWithRouter(<HistoryScreen />, { route: '/history' });

    const transactions = await screen.findAllByTestId(/transaction-card-/);
    expect(transactions).toHaveLength(mockTransactions.length);

    fireEvent.click(transactions[0]);

    const transactionDetail = await screen.findByTestId('transaction-details-popup');
    expect(transactionDetail).toBeVisible();
    expect(transactionDetail).toHaveTextContent(mockTransactions[0].amount);
    expect(transactionDetail).toHaveTextContent(new Date(mockTransactions[0].created_at).toLocaleDateString());
    expect(transactionDetail).toHaveTextContent(mockTransactions[0].payment_method.toUpperCase());
    expect(transactionDetail).toHaveTextContent(mockTransactions[0].transaction_id);
    expect(transactionDetail).toHaveTextContent(mockTransactions[0].customer_number);
  });

  test('Clicking on the Requested Refunds button navigates to Refunds view', async () => {
    renderWithRouter(<HistoryScreen />, { route: '/history' });

    const refundButton = screen.getByTestId('requested-refunds-button');
    fireEvent.click(refundButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/refunds');
    });
  });

  test('Submit refund request and redirect back to Requested Refund View', async () => {
    const mockTransactions = generateMockTransactions(10);
    axios.get.mockResolvedValueOnce({ data: mockTransactions });

    renderWithRouter(<HistoryScreen />, { route: '/history' });

    const transactions = await screen.findAllByTestId(/transaction-card-/);
    fireEvent.click(transactions[0]);

    const refundButton = screen.getByTestId('refund-customer-button');
    fireEvent.click(refundButton);

    await waitFor(() => {
      expect(screen.getByTestId('refund-request-submit-button')).toBeVisible();
    });

    fireEvent.change(screen.getByTestId('refund-request-reasons'), { target: { value: 'Incorrect amount charged' } });
    fireEvent.change(screen.getByTestId('refund-request-expected-payment'), { target: { value: '1' } });

    fireEvent.click(screen.getByTestId('refund-request-submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('requested-refunds-page')).toBeVisible();
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/refunds');
    });
  });
});

import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PaymentScreen from '../screens/PaymentScreen';
import QrPayScreen from '../components/payment/QRPay';
import HomeScreen from '../screens/HomeScreen';
import CustomKeypad from "../components/payment/CustomKeypad.js";
import { AuthProvider } from '../context/AuthContext';
import axios from 'axios';

jest.mock('axios');

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

const pressKeyOnKeypad = async (key) => {
  fireEvent.click(screen.getByText(key));
};

test('renders PaymentScreen with default amount', () => {
  renderWithRouter(<PaymentScreen />, { route: '/payment' });

  expect(screen.getByTestId('input-field')).toHaveValue('0');
});

test('Boundary Case: Inputting the minimum allowable amount via keypad', async () => {
  renderWithRouter(<PaymentScreen />, { route: '/payment' });

  fireEvent.click(screen.getByTestId('input-field'));
  await pressKeyOnKeypad('1');
  fireEvent.click(screen.getByTestId('equal-button'));

  await waitFor(() => {
    expect(screen.getByTestId('input-field')).toHaveValue('1');
  });
});

test('Boundary Case: Inputting the maximum allowable amount via keypad', async () => {
  renderWithRouter(<PaymentScreen />, { route: '/payment' });

  fireEvent.click(screen.getByTestId('input-field'));
  await pressKeyOnKeypad('1');
  await pressKeyOnKeypad('0');
  await pressKeyOnKeypad('0');
  await pressKeyOnKeypad('0');
  fireEvent.click(screen.getByTestId('equal-button'));

  await waitFor(() => {
    expect(screen.getByTestId('input-field')).toHaveValue('1000');
  });
});

test('Negative Case: Inputting a negative amount via keypad', async () => {
  renderWithRouter(<PaymentScreen />, { route: '/payment' });

  fireEvent.click(screen.getByTestId('input-field'));
  await pressKeyOnKeypad('1');
  await pressKeyOnKeypad('-');
  await pressKeyOnKeypad('2');
  fireEvent.click(screen.getByTestId('equal-button'));

  await waitFor(() => {
    expect(screen.getByTestId('generate-button')).toBeDisabled();
  });
});

test('Negative Case: Inputting a non-numeric value via keypad', async () => {
  renderWithRouter(<PaymentScreen />, { route: '/payment' });
  fireEvent.click(screen.getByTestId('input-field'));
  // As a placeholder, we use '-' which is valid on numeric keypads
  await pressKeyOnKeypad('-');

  await waitFor(() => {
    expect(screen.getByTestId('dash')).toBeDisabled();
  });
});

test('Negative Case: System failure in generating the QR code', async () => {
  axios.post.mockRejectedValue(new Error('Network error'));

  renderWithRouter(<PaymentScreen />, { route: '/payment' });

  fireEvent.click(screen.getByTestId('input-field'));
  await pressKeyOnKeypad('1');
  await pressKeyOnKeypad('0');
  await pressKeyOnKeypad('0');
  await pressKeyOnKeypad('0');
  fireEvent.click(screen.getByTestId('equal-button'));
  fireEvent.click(screen.getByTestId('generate-button'));

  await waitFor(() => {
    expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to generate QR code. Please try again later.');
  });
});



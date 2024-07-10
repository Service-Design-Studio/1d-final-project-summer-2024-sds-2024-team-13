import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';

test('renders login screen', () => {
  render(
    <Router>
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    </Router>
  );
  expect(screen.getByText('DBSBiz')).toBeInTheDocument();
});

test('allows user to log in', async () => {
  render(
    <Router>
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    </Router>
  );

  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
  fireEvent.click(screen.getByText('LOG IN'));

  expect(await screen.findByText('DBSBiz')).toBeInTheDocument();
});

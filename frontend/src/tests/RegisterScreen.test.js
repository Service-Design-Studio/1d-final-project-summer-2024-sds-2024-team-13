import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import RegisterScreen from '../screens/RegisterScreen';

test('renders register screen', () => {
  render(
    <Router>
      <AuthProvider>
        <RegisterScreen />
      </AuthProvider>
    </Router>
  );
  expect(screen.getByText('Create An Account')).toBeInTheDocument();
});

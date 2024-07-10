import { Given, When, Then } from '@cucumber/cucumber';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import { AuthProvider } from '../../context/AuthContext';

Given('I am on the login screen', () => {
  render(
    <Router>
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    </Router>
  );
});

When('I click the register link', () => {
  fireEvent.click(screen.getByText("Don't have an account? Register here."));
});

Then('I should be routed to the register page', () => {
  render(
    <Router>
      <AuthProvider>
        <RegisterScreen />
      </AuthProvider>
    </Router>
  );
  expect(screen.getByText('Create An Account')).toBeInTheDocument();
});

import { Given, When, Then } from '@cucumber/cucumber';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginScreen from '../../screens/LoginScreen';
import HomeScreen from '../../screens/HomeScreen';
import { AuthProvider } from '../../context/AuthContext';

Given('I open the app', () => {
  render(<Router><LoginScreen /></Router>);
});

Then('I should see the login screen', () => {
  expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByText("LOG IN")).toBeInTheDocument();
});

Given('I am on the login screen', () => {
  render(
    <Router>
      <AuthProvider>
        <LoginScreen />
      </AuthProvider>
    </Router>
  );
});

When('I enter my email and password', () => {
  fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@test.com' } });
  fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password' } });
});

When('I click the login button', () => {
  fireEvent.click(screen.getByText('LOG IN'));
});

Then('I should see the home screen', () => {
  render(
    <Router>
      <AuthProvider>
        <HomeScreen />
      </AuthProvider>
    </Router>
  );
  expect(screen.getByText('LATEST FROM TODAY')).toBeInTheDocument();
});

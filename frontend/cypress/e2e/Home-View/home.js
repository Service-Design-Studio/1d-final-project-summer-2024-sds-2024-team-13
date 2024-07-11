import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

let currentEarnings;
let customerId = 'e11957341b6c4e67bba7';  // Assuming a fixed customer ID for simplicity
let userId = 'a4e05f9f63a30477cfe5'

// Common steps
Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type('iamgay@gmail.com');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

// Navigation steps
Given("I am on the Home View", () => {
  cy.contains("DBSBiz").click();
  cy.url().should('include', '/home');
});

When("I click into the History View", () => {
  cy.contains("History").click();
  cy.url().should('include', '/history');
});

When("I click into the Home View", () => {
  cy.contains("Home").click();
  cy.url().should('include', '/home');
});

// Assertions
Then("I should see my daily earnings in the main card", () => {
  cy.contains("TODAY'S EARNINGS").should('be.visible');
});

Then("I should see a maximum of 5 most recent transactions", () => {
  cy.get('[data-testid="transaction-card"]').should('have.length.at.most', 5);
});

// New transaction via Postman simulation
When("I receive a new transaction of {string}", (amount) => {
  const newTransactionAmount = parseFloat(amount);
  const newEarnings = currentEarnings + newTransactionAmount;

  cy.request('POST', `${Cypress.env('baseURL')}/users/${userId}/transactions`, {
    customer_id: customerId,
    customer_number: '12345678',
    payment_method: 'Paynow',
    amount: amount,
    transaction_id: 'txn_' + new Date().getTime()
  }).then(response => {
    expect(response.status).to.eq(201);
    cy.wait(7000); // Wait for 7 seconds to allow the transaction to be processed
    cy.get('h3.todayEarning span').should('have.text', newEarnings.toFixed(2));
  });
});

Then("I should see the numbers for 'Today's Earnings' increase by {string}", (amount) => {
  const expectedEarnings = currentEarnings + parseFloat(amount);
  cy.request('GET', `${Cypress.env('baseURL')}/earnings`).then(response => {
    const earnings = response.body.earnings;
    expect(earnings).to.eq(expectedEarnings);  // Check that the earnings match the expected value
    cy.get('h3.todayEarning span').should('have.text', earnings.toFixed(2));
  });
});

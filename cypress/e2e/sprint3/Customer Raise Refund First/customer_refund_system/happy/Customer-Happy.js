import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Phone Number"]').type('12345678');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
});

Given("I am on the Transaction History View", () => {
  cy.contains("History").click();
  cy.url().should('include', '/history');
});

Given("I am on the Transaction Popup", () => {
  cy.get('[data-testid^="transaction-card"]').first().click(); // Assuming clicking the first transaction for simplicity
  cy.get('[data-testid="transaction-details-popup"]').should('be.visible');
});

When("I click on one of the transaction card in Transaction History View", () => {
  // Already covered in Given step "I am on the Transaction Popup"
});

Then("I should see how much I've paid", () => {
  cy.get('[data-testid="transaction-amount"]').should('be.visible');
});

Then("I am redirected to Request Refund view", () => {
  cy.get('[data-testid="refund-customer-button"]').click();
  cy.url().should('include', '/refunds/request');
});

Then("I should see the amount I paid, who I paid to, my phone number, date and time of transaction, transaction ID, expected payment from customer, reason for dispute and amount to be refunded", () => {
  cy.get('[data-testid="refund-amount"]').should('be.visible');
  cy.get('[data-testid="refund-hawker"]').should('be.visible');
  cy.get('[data-testid="refund-customer-mobile"]').should('be.visible');
  cy.get('[data-testid="refund-timestamp"]').should('be.visible');
  cy.get('[data-testid="refund-transaction-id"]').should('be.visible');
  cy.get('[data-testid="refund-expected-payment"]').should('be.visible');
  cy.get('[data-testid="refund-reasons"]').should('be.visible');
  cy.get('[data-testid="refund-amount-to-be-refunded"]').should('be.visible');
});

When("I click on Request Refund button on the Popup", () => {
  cy.get('[data-testid="refund-customer-button"]').click();
});

Then("I fill in the respective fields for expected payment from customer", () => {
  cy.get('[data-testid="expected-payment-input"]').type('50'); // Example value
  cy.get('[data-testid="refund-reason-input"]').type('Incorrect amount charged');
});

When("I click on Submit button", () => {
  cy.get('[data-testid="refund-submit-button"]').click();
});

Then("I see a notification at the bottom saying {string}", (notification) => {
  cy.contains(notification).should('be.visible');
});

Then("I should be redirected to Transaction History View", () => {
  cy.url().should('include', '/history');
});

Then("I should see that transaction card become red", () => {
  cy.get('[data-testid^="transaction-card"]').first().should('have.css', 'border-left-color', 'rgb(255, 0, 0)'); // Assuming red color indicates a dispute
});

Then("a notification update on my Request Refund button", () => {
  cy.get('[data-testid="refund-notification"]').should('be.visible');
});

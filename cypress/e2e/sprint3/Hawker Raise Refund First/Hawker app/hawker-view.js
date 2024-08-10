import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]', { timeout: 10000 }).type('chicken@gmail.com');
  cy.get('input[placeholder="Password"]', { timeout: 10000 }).type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

Given("on Transaction History View", () => {
  cy.contains("History", { timeout: 10000 }).click();
  cy.url().should('include', '/history');
});

When("I click on one of the transactions in the Transaction History View", () => {
  cy.get('[data-testid^="transaction-card"]', { timeout: 10000 })
    .first()
    .should('be.visible')
    .click({ force: true });
});

Then("I should see a popup Transaction Details View", () => {
  cy.get('[data-testid="transaction-details-popup"]').should('be.visible');
});

Then("I should see amount", () => {
  cy.get('[data-testid="transaction-amount"]').should('be.visible');
});

Then("I should see timestamp", () => {
  cy.get('[data-testid="transaction-timestamp"]').should('be.visible');
});

Then("I should see payment source", () => {
  cy.get('[data-testid="transaction-payment-source"]').should('be.visible');
});

Then("I should see transaction ID", () => {
  cy.get('[data-testid="transaction-id"]').should('be.visible');
});

Then("I should see customer mobile", () => {
  cy.get('[data-testid="transaction-customer-mobile"]').should('be.visible');
});

Then("I should see a Refund Customer button", () => {
  cy.get('[data-testid="refund-customer-button"]').should('be.visible');
});

Given("that I click on the Refund Customer button", () => {
  cy.get('[data-testid="refund-customer-button"]', { timeout: 10000 }).click();
});

Then("I should be redirected to Refund Customer View", () => {
  cy.url({ timeout: 10000 }).should('include', '/refunds/request');
});

Then("I should see the amount the customer paid", () => {
  cy.get('[data-testid="refund-request-amount"]').should('be.visible');
});

Then("I should see the hawker the amount was paid to", () => {
  cy.get('[data-testid="refund-request-hawker"]').should('be.visible');
});

Then("I should see the customer mobile that paid", () => {
  cy.get('[data-testid="refund-request-customer-mobile"]').should('be.visible');
});

Then("I should see the date and time of the transaction", () => {
  cy.get('[data-testid="refund-request-timestamp"]').should('be.visible');
});

Then("I should see the transaction ID", () => {
  cy.get('[data-testid="refund-request-transaction-id"]').should('be.visible');
});

Then("I should see the reason for refund", () => {
  cy.get('[data-testid="refund-request-reasons"]').should('be.visible');
});

Then("I fill up accordingly", () => {
  cy.get('input[data-testid="refund-request-reasons"]').type('Incorrect amount charged');
  cy.get('input[data-testid="refund-request-expected-payment"]').type('1');
});

Then("I should see Submit Button", () => {
  cy.get('[data-testid="refund-request-submit-button"]').should('be.visible');
});

Then("click on Submit", () => {
  cy.get('[data-testid="refund-request-submit-button"]', { timeout: 10000 }).click();
});

Then("I should redirect back to Requested Refund View", () => {
  cy.url({ timeout: 10000 }).should('include', '/refunds');
});

Then("I should be on Review Request View", () => {
  cy.url({ timeout: 10000 }).should('include', '/refunds/request');
});

Then("there I should see Refund Amount, Paid To, Original Payment, Expected Payment from Customer", () => {
  cy.get('[data-testid="refund-request-amount"]').should('be.visible');
  cy.get('[data-testid="refund-request-hawker"]').should('be.visible');
  cy.get('[data-testid="refund-request-customer-mobile"]').should('be.visible');
  cy.get('[data-testid="refund-request-timestamp"]').should('be.visible');
});

Then("a Confirm Refund Button", () => {
  cy.get('[data-testid="confirm-refund-button"]', { timeout: 10000 }).should('be.visible');
});

Then("I click Confirm Refund Button", () => {
  cy.get('[data-testid="confirm-refund-button"]', { timeout: 10000 }).click();
});

Then("I should be redirected back to Requested Refund View", () => {
  cy.url({ timeout: 10000 }).should('include', '/refunds');
});

Then("I click on the back button", () => {
  cy.get('[data-testid="back-button"]', { timeout: 10000 }).click();
});

Then("I should see a deduction in my daily earnings and total earnings on Transaction History", () => {
  cy.get('[data-testid^="transaction-card"]', { timeout: 10000 }).should('contain', 'REFUNDED');
});

When("I click on Requested Refunds button", () => {
  cy.get('[data-testid="requested-refunds-button"]', { timeout: 10000 }).click();
});

Then("I should see a Requested Refunds page", () => {
  cy.url().should('include', '/refunds');
  cy.get('[data-testid="requested-refunds-page"]', { timeout: 10000 }).should('be.visible');
});

Then("when I click on the back button", () => {
  cy.get('[data-testid="back-button"]', { timeout: 10000 }).click();
});

Then("I should see a pending tab, refunded tab and rejected tab", () => {
  cy.get('[data-testid="pending-tab"]').should('be.visible');
  cy.get('[data-testid="refunded-tab"]').should('be.visible');
  cy.get('[data-testid="rejected-tab"]').should('be.visible');
});

import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type('chicken@gmail.com');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

Given("on Transaction History View", () => {
  cy.contains("History").click();
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
  cy.get('[data-testid="refund-customer-button"]').click();
});

Then("I should be redirected to Refund Customer View", () => {
  cy.url().should('include', '/refunds/request');
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

Then("I should see the reason(s) for refund", () => {
  cy.get('[data-testid="refund-request-reasons"]').should('be.visible');
});

Then("I should see green SUBMITTED", () => {
  cy.get('[data-testid="refund-request-submitted"]').should('be.visible');
});

When("I fill up accordingly", () => {
  cy.get('input[data-testid="refund-request-reasons"]').type('Incorrect amount charged');
  cy.get('input[data-testid="refund-request-expected-payment"]').type('1');
});

When("click on Submit", () => {
  cy.get('[data-testid="refund-request-submit-button"]').click();
});

Then("I should be redirected back to Transaction History View", () => {
  cy.url().should('include', '/history');
});

Then("I should see a deduction in my daily earnings and total earnings", () => {
  cy.get('[data-testid="daily-earnings"]').should('contain', '-'); // Assuming negative value indicates deduction
  cy.get('[data-testid="total-earnings"]').should('contain', '-');
});

When("I click on Requested Refunds button", () => {
  cy.get('[data-testid="requested-refunds-button"]').click();
});

Then("I should see a Requested Refunds page", () => {
  cy.url().should('include', '/refunds');
  cy.get('[data-testid="requested-refunds-page"]').should('be.visible');
});

Then("I should see a pending tab, refunded tab and rejected tab", () => {
  cy.get('[data-testid="pending-tab"]').should('be.visible');
  cy.get('[data-testid="refunded-tab"]').should('be.visible');
  cy.get('[data-testid="rejected-tab"]').should('be.visible');
});

Then("I should be directed to requested refunds page", () => {
  cy.url().should('include', '/refunds');
});

Then("I should see a pending tab", () => {
  cy.get('[data-testid="pending-tab"]').should('be.visible');
});

Then("I should see a refunded tab", () => {
  cy.get('[data-testid="refunded-tab"]').should('be.visible');
});

Then("I should see a rejected tab", () => {
  cy.get('[data-testid="rejected-tab"]').should('be.visible');
});

Then("I see refunds that are pending from customer", () => {
  cy.get('[data-testid="pending-refunds"]').should('contain', 'Pending');
});

When("I click on a pending refund if there is any", () => {
  cy.get('[data-testid^="refund-card-"]').first().click(); // Click the first pending refund
});

Then("I should see the Refund Details View", () => {
  cy.url().should('include', '/refunds/details');
  cy.get('[data-testid="refund-details-view"]').should('be.visible');
});

Then("I should see two buttons, one for accept and one for decline", () => {
  cy.get('[data-testid="accept-button"]').should('be.visible');
  cy.get('[data-testid="decline-button"]').should('be.visible');
});

import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Phone Number"]').type('12345678');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
});

Given("I am on logged into the app", () => {
  // Already covered in Before hook
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

Given("I am back on Transaction History View", () => {
  cy.contains("History").click();
  cy.url().should('include', '/history');
});

When("I click on Requested Refunds button", () => {
  cy.get('[data-testid="refund-button"]').click();
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

Given("I clicked on the Request Refunds button", () => {
    cy.get('[data-testid="refund-button"]').click();
  });

Then("I should be directed to requested refunds page", () => {
    cy.url().should('include', '/refunds');
    cy.get('[data-testid="requested-refunds-page"]').should('be.visible');
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

Then("I see refunds that are pending", () => {
    cy.get('[data-testid="pending-refunds"]', { timeout: 10000 }).should('contain', 'Pending');
});

When("I click on a pending refund if there is any", () => {
  cy.get('[data-testid="pending-refunds"] > :first-child').click();
});

Then("I should see the Request Refund View", () => {
  cy.url().should('include', '/refunds/details');
  cy.get('[data-testid="refund-details-view"]').should('be.visible');
});

Then("I should see the amount the customer paid", () => {
  cy.get('[data-testid="refund-amount"]').should('be.visible');
});

Then("I should see the hawker the amount was paid to", () => {
  cy.get('[data-testid="refund-hawker"]').should('be.visible');
});

Then("I should see the customer mobile that paid", () => {
  cy.get('[data-testid="refund-customer-mobile"]').should('be.visible');
});

Then("I should see the date and time of the transaction", () => {
  cy.get('[data-testid="refund-timestamp"]').should('be.visible');
});

Then("I should see the transaction ID", () => {
  cy.get('[data-testid="refund-transaction-id"]').should('be.visible');
});

Then("I should see the reason(s) for refund", () => {
  cy.get('[data-testid="refund-reasons"]').should('be.visible');
});

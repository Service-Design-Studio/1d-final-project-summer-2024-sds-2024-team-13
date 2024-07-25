import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
    cy.viewport('iphone-6+');
    cy.visit("/");
    cy.get('input[placeholder="Email"]').type('chicken@gmail.com');
    cy.get('input[placeholder="Password"]').type('123');
    cy.contains("LOG IN").click();
    cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
  });

  Given("I am on Transaction History View", () => {
    cy.contains("History").click();
    cy.url().should('include', '/history');
  });

Given("I am on Refund Request view", () => {
  cy.get('[data-testid="refund-button"]').click();
  cy.url().should('include', '/refunds');
});

When("I click on transaction card that contains {string}", (status) => {
  cy.contains(status).click();
});

Then("I should be redirected to Refund Details view of the transaction card", () => {
  cy.url().should('include', '/refund-details');
});

Then("I should see decline button", () => {
  cy.get('[data-testid="decline-button"]').should('be.visible');
});

Then("I should see accept button", () => {
  cy.get('[data-testid="accept-button"]').should('be.visible');
});

Given("I am on the Refund Details Page", () => {
  // Navigate to the Refund Details Page directly
  cy.visit("/refund-details");
});

When("I click on the Accept button", () => {
  cy.get('[data-testid="accept-button"]').click();
});

Then("I should be redirected back to Transaction History view", () => {
  cy.url().should('include', '/history');
});

Then("I should see a new transaction card with a deduction and word saying “REFUNDED”", () => {
  cy.get('[data-testid="transaction-list"]').should('contain', 'REFUNDED');
});

Then("I should see the refunded transaction in the Refunded Tab", () => {
  cy.get('[data-testid="refunded-tab"]').click();
  cy.get('[data-testid="transaction-list"]').should('contain', 'REFUNDED');
});

When("I click on Requested Refund button", () => {
  cy.get('[data-testid="refund-button"]').click();
});

When("I click on Refunded Tab in Requested Refunds view", () => {
  cy.get('[data-testid="refunded-tab"]').click();
});

When("I click on the Decline button", () => {
  cy.get('[data-testid="decline-button"]').click();
});

Then("I should see no deduction from my account", () => {
  cy.get('[data-testid="transaction-list"]').should('not.contain', 'DEDUCTED');
});

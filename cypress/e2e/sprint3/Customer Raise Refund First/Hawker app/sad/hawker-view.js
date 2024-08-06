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
  cy.visit("/refunds");
  cy.url().should('include', '/refunds');
});

When("I click on transaction card that contains {string}", (status) => {
  cy.get('[data-testid^="refund-card"]')
    .first()
    .should('be.visible')
    .click({ force: true });
});

Then("I should be redirected to Refund Details view of the transaction card", () => {
  cy.url().should('include', '/refunds/review');
});

Then("I should see decline button", () => {
  cy.get('[data-testid="decline-button"]').should('be.visible');
});

Then("I should see accept button", () => {
  cy.get('[data-testid="accept-button"]').should('be.visible');
});

Then("I click on the decline button", () => {
  cy.get('[data-testid="decline-button"]').click();
});

Then("I should see the Decline Refund overlay", () => {
  cy.get('[data-testid="refund-reject-overlay"]').should('be.visible');
});

Then("I did not give a reason for rejection", () => {
  cy.get('[data-testid="reject-message-input"]').should('have.value', '');
});

Then("I should see that the Decline Request button is greyed out", () => {
  cy.get('[data-testid="reject-confirm-button"]').should('have.attr', 'disabled');
});

Then("I should not be able to press it", () => {
  cy.get('[data-testid="reject-confirm-button"]').should('be.disabled');
});

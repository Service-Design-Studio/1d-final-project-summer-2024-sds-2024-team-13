import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
    cy.viewport('iphone-6+');
    cy.visit("/");
    cy.get('input[placeholder="Phone Number"]').type('12345678');
    cy.get('input[placeholder="Password"]').type('123');
    cy.contains("LOG IN").click();
  });

Given("that I am on Transaction History View", () => {
  cy.contains("History").click();
  cy.url().should('include', '/history');
});

Given("I am on the Refund Pending View \\(Refund Details)", () => {
  cy.visit("/refunds");
  cy.url().should('include', '/refunds');
  cy.get('[data-testid^="refund-card"]')
    .contains("Waiting for merchant's approval")
    .should('be.visible')
    .click({ force: true });
  cy.url().should('include', '/refunds/details');
});

Then("I click on the Cancel Request button", () => {
  cy.get('[data-testid="cancel-request-button"]').click();
});

Then("I should be redirected back to Requested Refund View", () => {
    cy.url().should('include', '/refunds');
  });
  
Then("I click on the back button", () => {
    cy.get('[data-testid="back-button"]').click();
  });

Then("I click on the Requested Refund button", () => {
  cy.get('[data-testid="requested-refunds-button"]').click();
});

Then("it should be deleted", () => {
  cy.get('[data-testid="pending-tab"]').click();
  cy.get('[data-testid^="refund-card"]').should('not.exist');
});

Then("not seen on any of the Tabs in Requested Refund View", () => {
  cy.get('[data-testid="refunded-tab"]').click();
  cy.get('[data-testid^="refund-card"]').should('not.exist');
  cy.get('[data-testid="rejected-tab"]').click();
  cy.get('[data-testid^="refund-card"]').should('not.exist');
});

Given("Hawker rejects/declines dispute raised by customer", () => {
  cy.get('[data-testid^="refund-card"]').contains('Pending')
    .should('be.visible')
    .click({ force: true });
  cy.get('[data-testid="decline-button"]').click();
  cy.get('[data-testid="reject-message-input"]').type('Invalid reason');
  cy.get('[data-testid="reject-confirm-button"]').click();
  cy.url().should('include', '/history'); // Redirect back to hawker's transaction history
});

Then("a red notification on the transaction that I raised a dispute about on Transaction History View", () => {
  cy.visit("/history");
  cy.get('[data-testid^="transaction-card"]').first()
    .should('contain', 'DISPUTE REJECTED')
    .and('have.css', 'color', 'rgb(235, 50, 35)'); // Assuming red text indicates rejection
});

Then("I should see a Resubmit Request button", () => {
  cy.get('[data-testid="resubmit-request-button"]').should('be.visible');
});

Then("an error message saying {string}", (message) => {
  cy.get('[data-testid="error-message"]').should('contain', message);
});

When("I click on the transaction on Transaction History View", () => {
  cy.get('[data-testid^="transaction-card"]').first().click({ force: true });
});
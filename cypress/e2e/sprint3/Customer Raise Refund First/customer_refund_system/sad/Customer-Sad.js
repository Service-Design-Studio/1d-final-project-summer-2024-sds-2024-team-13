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
  cy.get('[data-testid="refund-button"]').click();
});

Then("it should be deleted", () => {
  cy.get('[data-testid="pending-tab"]').click();
});

Then("not seen on any of the Tabs in Requested Refund View", () => {
  cy.get('[data-testid="refunded-tab"]').click();
  cy.get('[data-testid="rejected-tab"]').click();
});

Given("I am on the Refund Pending View and on rejected Tab", () => {
    cy.visit("/refunds");
    cy.url().should('include', '/refunds');
    cy.get('[data-testid="rejected-tab"]').click();
  });

Then("I click into Refund Details", () => {
  cy.get('[data-testid^="refund-card"]')
    .contains("Request Rejected")
    .should('be.visible')
    .click({ force: true });
  cy.url().should('include', '/refunds/details');
  });

Then("I will see Please make an...", () => {
    cy.contains("Please make an attempt to contact the merchant to verify transaction details.")
  });
  
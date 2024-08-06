import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Phone Number"]').type('12345678');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
});

Given("I am on the History View", () => {
  cy.contains("History").click();
  cy.url().should('include', '/history');
});

When("hawker sends a refund", () => {
});

Then("I should see a new transaction card about the refund", () => {
  cy.get('[data-testid^="transaction-card"]').should('contain', 'REFUND');
});



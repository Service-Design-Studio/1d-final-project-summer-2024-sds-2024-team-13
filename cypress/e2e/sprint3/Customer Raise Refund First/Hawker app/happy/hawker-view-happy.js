import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]', { timeout: 10000 }).type('higoogle@gmail.com');
  cy.get('input[placeholder="Password"]', { timeout: 10000 }).type('123');
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
  cy.get('[data-testid^="refund-card"]', { timeout: 10000 })
    .first()
    .should('be.visible')
    .click({ force: true });
});

Then("I should be redirected to Refund Details view of the transaction card", () => {
  cy.url().should('include', '/refunds/review');
});

Then("I should see decline button", () => {
  cy.get('[data-testid="decline-button"]', { timeout: 10000 }).should('be.visible');
});

Then("I should see accept button", () => {
  cy.get('[data-testid="accept-button"]', { timeout: 10000 }).should('be.visible');
});

Then("I click on the Accept button", () => {
    cy.get('[data-testid="accept-button"]', { timeout: 10000 }).click();
  });
  

  Then("I should be redirected to Refund Request View", () => {
    cy.url().should('include', '/refunds');
  });

  Then("I clicked on the back button", () => {
    cy.get('[data-testid="back-button"]', { timeout: 10000 })
    .first()
    .click({ force: true });
});

  Then("I should see a new transaction card with a deduction and word saying “REFUNDED”", () => {
    cy.get('[data-testid^="transaction-card"]', { timeout: 10000 })
      .first()
      .should('contain', 'REFUNDED')
    });
   
  Then("I click on Requested Refund button", () => {
    cy.get('[data-testid="requested-refunds-button"]', { timeout: 10000 }).click();
      });
  Then("Click on Refunded Tab in Requested Refunds view", () => {
    cy.get('[data-testid="refunded-tab"]', { timeout: 10000 }).click();
      });

  Then("I should see the refunded transaction in the Refunded Tab", () => {
    cy.get('[data-testid^="refund-card"]', { timeout: 10000 })
      .first()
      .should('contain', 'REFUNDED');
    });

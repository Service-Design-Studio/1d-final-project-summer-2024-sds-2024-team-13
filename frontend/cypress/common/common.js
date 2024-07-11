import { Given } from '@badeball/cypress-cucumber-preprocessor';

Given("I am on Home View", () => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type('iamgay@gmail.com');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz").click();
  cy.url().should('include', '/home');
});
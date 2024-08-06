import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the Home View", () => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type('iamgay@gmail.com');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz").click();
  cy.url().should('include', '/home');
});

Given("I want to hide my current daily earnings", () => {
  // This step can be used to verify the earnings are visible initially
  cy.get('[data-testid="todays-earnings"]').should('not.contain', '*****');
});

When("I click on the “eye” icon", () => {
  cy.get('[data-testid="eye-icon"]').click();
});

Then("I should see the digits of my “Today’s Earnings” replaced by “*”", () => {
  cy.get('[data-testid="todays-earnings"]').should('contain', '*****');
});

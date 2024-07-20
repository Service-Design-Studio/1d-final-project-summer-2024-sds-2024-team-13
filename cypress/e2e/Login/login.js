import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the login page", () => {
  cy.viewport('iphone-6+'); // This sets the viewport to iPhone 6+ dimensions
  cy.visit("/");
});

When("I type in the email {string}", (email) => {
  cy.get('input[placeholder="Email"]').type(email);
});

When("I type in the password {string}", (password) => {
  cy.get('input[placeholder="Password"]').type(password);
});

When("I click the login button", () => {
  cy.contains("LOG IN").click();
});

Then("I should see the homepage", () => {
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible'); // Increased timeout to 10 seconds
});

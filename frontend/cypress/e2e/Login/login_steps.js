import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the login page", () => {
  cy.viewport('iphone-6'); // This sets the viewport to iPhone 6 dimensions
  cy.visit("/");
});

When("I type in the email {string} and password {string}", (email, password) => {
  cy.get('input[placeholder="Email"]').type(email);
  cy.get('input[placeholder="Password"]').type(password);
});

When("I click the login button", () => {
  cy.contains("LOG IN").click();
});

Then("I should see the homepage", () => {
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible'); // Increased timeout to 10 seconds
});

Given("I am logged into the app", () => {
  cy.viewport('iphone-6'); // This sets the viewport to iPhone 6 dimensions
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type("iamgay@gmail.com");
  cy.get('input[placeholder="Password"]').type("123");
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

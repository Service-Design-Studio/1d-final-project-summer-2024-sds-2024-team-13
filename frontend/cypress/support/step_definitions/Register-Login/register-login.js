import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Registration Steps
Given("I open the login page", () => {
  cy.viewport('iphone-6'); // This sets the viewport to iPhone 6 dimensions
  cy.visit("/");
});

When("I click on the register link", () => {
  cy.contains("Don't have an account? Register here.").click();
});

When("I type in the name {string}", (name) => {
  cy.get('input[placeholder="Name"]').type(name);
});

When("I type in the email {string}", (email) => {
  cy.get('input[placeholder="Email"]').type(email);
});

When("I type in the phone number {string}", (phone) => {
  cy.get('input[placeholder="Phone Number"]').type(phone);
});

When("I type in the password {string}", (password) => {
  cy.get('input[placeholder="Password"]').type(password);
});

When("I click the register button", () => {
  cy.contains("REGISTER").click();
});

Then("I should be redirected to the login page", () => {
  cy.url().should('include', '/');
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible'); // Increased timeout to 10 seconds
});

// Login Steps
When("I type in the login email {string}", (email) => {
  cy.get('input[placeholder="Email"]').type(email);
});

When("I type in the login password {string}", (password) => {
  cy.get('input[placeholder="Password"]').type(password);
});

When("I click the login button", () => {
  cy.contains("LOG IN").click();
});

Then("I should see the homepage", () => {
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible'); // Increased timeout to 10 seconds
});
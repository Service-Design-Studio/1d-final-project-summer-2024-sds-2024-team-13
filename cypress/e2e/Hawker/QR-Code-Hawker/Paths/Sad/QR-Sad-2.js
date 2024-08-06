import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

// Common steps
Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type('chicken@gmail.com');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

// Step definition for "I am on Home View"
Given("I am on Home View", () => {
  cy.contains("DBSBiz").click();
  cy.url().should('include', '/home');
});

// Step definition for "I am on Payment View"
Given("I am on Payment View", () => {
  cy.visit('/payment');
  cy.url().should('include', '/payment');
});

// Step definition for "I should see an input field with 0"
Then("I should see an input field with 0", () => {
  cy.get('[data-testid="input-field"]').should('have.value', '0');
});

// Step definition for "I click on input field"
When("I click on input field", () => {
  cy.get('[data-testid="input-field"]').click();
});

// Step definition for "I should see a keypad"
Then("I should see a keypad", () => {
  cy.get('[data-testid="keypad"]').should('be.visible');
});

// Step definition for "I press {string} on the keypad"
When("I press {string} on the keypad", (key) => {
  cy.get(`[data-testid="keypad"] button`).contains(key).click();
});

// Step definition for "I should see the input field update to {string}"
Then("I should see the input field update to {string}", (value) => {
  cy.get('[data-testid="input-field"]').should('have.value', value);
});

// Step definition for "I clicked on the Generate button"
When("I clicked on the Generate button", () => {
  cy.get('[data-testid="generate-button"]').click();
});


// Step definition for "I clicked on the Edit button"
Then("I clicked on the Edit button", () => {
  cy.get('[data-testid="edit-button"]').click();
});

// Step definition for "I should be redirected to Payment View"
Then("I should be redirected to Payment View", () => {
  cy.url().should('include', '/payment');
});

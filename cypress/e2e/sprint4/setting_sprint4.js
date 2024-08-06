import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on Home View", () => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]', { timeout: 10000 }).type('chicken@gmail.com');
  cy.get('input[placeholder="Password"]', { timeout: 10000 }).type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
  cy.url().should('include', '/home');
});

When("I click into the Payment View", () => {
  cy.visit('/payment');
  cy.url().should('include', '/payment');
});

Then("I should see an input field with 0", () => {
  cy.get('[data-testid="input-field"]', { timeout: 10000 }).should('have.value', '0');
});

When("I click on input field", () => {
  cy.get('[data-testid="input-field"]').click();
});

Then("I should see a keypad", () => {
  cy.get('[data-testid="keypad"]').should('be.visible');
});

When("I press {string} on the keypad", (key) => {
  cy.get(`[data-testid="keypad"] button`).contains(key).click();
});

Then("I should see the input field update to {string}", (value) => {
  cy.get('[data-testid="input-field"]').should('have.value', value);
});

Then("I should see a Next button", () => {
  cy.get('[data-testid="generate-button"]').should('exist');
});

When("I click the Next button", () => {
  cy.window().then((win) => {
    cy.spy(win.console, 'log').as('consoleLog');
  });
  cy.get('[data-testid="generate-button"]').click();
});

Then("I should be redirected to the QR Pay view", () => {
  cy.url().should('include', '/payment/QRPay');
});


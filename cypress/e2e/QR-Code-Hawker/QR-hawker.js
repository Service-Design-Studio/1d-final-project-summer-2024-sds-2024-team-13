import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on Home View", () => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type('iamlove@gmail.com');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz").click();
  cy.url().should('include', '/home');
});

When("I click into the Payment View", () => {
  cy.visit('/payment');
  cy.url().should('include', '/payment');
});

Then("I should see an input field with 0", () => {
  cy.get('[data-testid="input-field"]').should('have.value', '0');
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

When("I click the arrow icon", () => {
  cy.get('[data-testid="arrow-icon"]').click();
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

Given("that I am on QR Pay View", () => {
  cy.url().should('include', '/payment/QRPay');
});

When("customer has made the payment within 30 seconds", () => {
  cy.window().then((win) => {
    cy.spy(win.console, 'log').as('consoleLog');
  });
  // Simulate waiting for the payment
  cy.wait(30000);
});

Then("I should see an animation", () => {
  cy.get('@consoleLog').should('be.calledWith', 'DEBUG: PAYMENT FROM CUSTOMER RECEIVED');
  cy.get('[data-testid="success-animation"]').should('be.visible');
});

Then("I should be redirected to Payment View after 5 seconds", () => {
  cy.wait(5000);
  cy.url().should('include', '/payment');
});

Then("I should be redirected to Payment View", () => {
  cy.url().should('include', '/payment');
});

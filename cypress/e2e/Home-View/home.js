import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

let currentEarnings;
const customerId = '96b8c94ec8ef7db04f53';  // Assuming a fixed customer ID for simplicity
const userId = '96b8c94ec8ef7db04f53';

// Common steps
Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type('chicken@gmail.com');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

// Navigation steps
Given("I navigate to the Home View", () => {
  cy.contains("DBSBiz").click();
  cy.url().should('include', '/home');
});

When("I click into the History View", () => {
  cy.contains("History").click();
  cy.url().should('include', '/history');
});

When("I click into the Home View", () => {
  cy.contains("Home").click();
  cy.url().should('include', '/home');
});

// Assertions
Then("I should see my daily earnings in the main card", () => {
  cy.contains("TODAY'S EARNINGS").should('be.visible');
});

Then("I should see a maximum of 5 most recent transactions", () => {
  cy.get('[data-testid="transaction-card"]').should('have.length.at.most', 5);
});

Given("I want my current daily earnings hidden", () => {
  // This step can be used to verify the earnings are visible initially
  cy.get('[data-testid="today-earnings"]').should('not.contain', '--.--');
});

When('I click on the "eye" icon', () => {
  cy.get('[data-testid="toggle-earnings-button"]').click();
});

Then('I should see the digits of my "Today\'s Earnings" replaced by "--.--"', () => {
  cy.get('[data-testid="today-earnings"]').should('contain', '--.--');
});
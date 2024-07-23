import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the login page", () => {
  cy.viewport('iphone-6+');
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
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

Given("I am on the Home View", () => {
  cy.contains("DBSBiz").click();
  cy.url().should('include', '/home');
});

When("I click into the History View", () => {
  cy.contains("History").click();
  cy.url().should('include', '/history');
});

Then("I should see a dropdown menu with the tag {string}", (tag) => {
  cy.get('div').contains(tag).should('be.visible');
});

Then("I should see the past transactions listed below", () => {
  cy.get('[data-testid="transaction-list"]').should('be.visible');
});

When("I click on the dropdown menu with the tag {string}", (tag) => {
  cy.get('[data-testid="dropdown-trigger"]').contains(tag).click();
});

Then("I should see a dropdown box showing options sorting by date range, day, and month", () => {
  cy.get('[data-testid="dropdown-content"]').should('be.visible').and('contain', 'Date Range').and('contain', 'Day').and('contain', 'Month');
});

When("I select a Date Range from 15 June to 17 June", () => {
  cy.get('[data-testid="dropdown-content"]').contains('Date Range').click();
  cy.get('.react-datepicker').first().click().get('div.react-datepicker__day--015').click();
  cy.get('.react-datepicker').first().click().get('div.react-datepicker__day--017').click();
  cy.contains('Apply Filter').click();
});

Then("I should see the dropdown box closing", () => {
  cy.get('[data-testid="dropdown-content"]').should('not.be.visible');
});

Then("I should see my past transactions from 15 June to 17 June listed below", () => {
  cy.get('[data-testid="transaction-list"]').should('contain', '15 Jun').and('contain', '17 Jun');
});

Then("I should see {string} on the top right", (text) => {
  cy.get('.earnings-summary').contains(text).should('be.visible');
});

When("I click on the Yesterday button", () => {
  cy.get('[data-testid="dropdown-content"]').contains('Yesterday').click();
});

Then("I should see my past transactions for Yesterday listed below", () => {
  cy.get('[data-testid="transaction-list"]').should('contain', 'Yesterday');
});

When("I click on the THIS MONTH button", () => {
  cy.get('[data-testid="dropdown-content"]').contains('THIS MONTH').click();
});

Then("I should see my past transactions for the month of June listed below", () => {
  cy.get('[data-testid="transaction-list"]').should('contain', 'June');
});

Then("I should see {string} on the top left", (text) => {
  cy.get('.date-indicator').contains(text).should('be.visible');
});

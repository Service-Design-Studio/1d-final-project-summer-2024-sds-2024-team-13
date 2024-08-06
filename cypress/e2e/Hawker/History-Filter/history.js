import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I open the login page on a mobile device", () => {
  cy.viewport('iphone-6+');
  cy.visit("/");
});

When("I enter the email {string}", (email) => {
  cy.get('input[placeholder="Email"]').type(email);
});

When("I enter the password {string}", (password) => {
  cy.get('input[placeholder="Password"]').type(password);
});

When("I click the login button", () => {
  cy.contains("LOG IN").click();
});

Then("I should be redirected to the homepage", () => {
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

Given("I am on the home page after login", () => {
  cy.contains("DBSBiz").click();
  cy.url().should('include', '/home');
});

When("I navigate to the history page", () => {
  cy.contains("History").click();
  cy.url().should('include', '/history');
});

Then("I should see a dropdown menu labeled {string}", (label) => {
  cy.get('div').contains(label).should('be.visible');
});

Then("I should see the list of past transactions", () => {
  cy.get('[data-testid="transaction-list"]').should('be.visible');
});

When("I open the dropdown menu with the label {string}", (label) => {
  cy.get('[data-testid="dropdown-trigger"]').contains(label).click();
});

Then("I should see a dropdown with options to sort by date range, Today, Yesterday, This Month, and Last Month", () => {
  cy.get('[data-testid="dropdown-content"]').should('be.visible').and('contain', 'Date Range').and('contain', 'Today').and('contain', 'Yesterday').and('contain', 'This Month').and('contain', 'Last Month');
});

When("I select the date range from 15 June to 17 June", () => {
  cy.get('[data-testid="dropdown-content"]').contains('Date Range').click();
  cy.get('.react-datepicker').first().click().get('div.react-datepicker__day--015').click();
  cy.get('.react-datepicker').first().click().get('div.react-datepicker__day--017').click();
  cy.contains('Apply Filter').click();
});

Then("I should see the dropdown close", () => {
  cy.get('[data-testid="dropdown-content"]').should('not.be.visible');
});

Then("I should see the transactions from 15 June to 17 June listed", () => {
  cy.get('[data-testid="transaction-list"]').should('contain', '15 Jun').and('contain', '17 Jun');
});

Then("I should see the text {string} on the top right", (text) => {
  cy.get('.earnings-summary').contains(text).should('be.visible');
});

When("I click the Yesterday button in the dropdown", () => {
  cy.get('[data-testid="dropdown-content"]').contains('Yesterday').click();
});

Then("I should see the transactions from Yesterday listed", () => {
  cy.get('[data-testid="transaction-list"]').should('contain', 'Yesterday');
});

When("I click the THIS MONTH button in the dropdown", () => {
  cy.get('[data-testid="dropdown-content"]').contains('THIS MONTH').click();
});

Then("I should see the transactions from this month listed", () => {
  cy.get('[data-testid="transaction-list"]').should('contain', 'June');
});

Then("I should see the text {string} on the top left", (text) => {
  cy.get('.date-indicator').contains(text).should('be.visible');
});

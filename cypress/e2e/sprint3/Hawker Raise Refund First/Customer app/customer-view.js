import { Before, Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Phone Number"]').type('12345678');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

Given("I am on logged into the app", () => {
  // Already covered in Before hook
});

Given("I am on the History View", () => {
  cy.contains("History").click();
  cy.url().should('include', '/history');
});

When("hawker sends a refund", () => {
  // Simulate hawker sending a refund, you might need to mock this action if not possible through UI
  cy.request('POST', '/api/refund', { /* refund data */ }).then((response) => {
    expect(response.status).to.eq(200);
  });
});

Then("I should see a new transaction card about the refund", () => {
  cy.get('[data-testid="transaction-list"]').should('contain', 'Refund');
});

Then("I should see a green text which signifies increase", () => {
  cy.get('[data-testid="transaction-list"] .refund-transaction').should('have.css', 'color', 'rgb(0, 128, 0)'); // assuming green text is styled with class 'refund-transaction'
});

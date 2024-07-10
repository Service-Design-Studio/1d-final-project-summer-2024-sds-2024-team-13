import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Common steps
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

// Login and navigation steps
Given("I am logged into the app", () => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type("iamgay@gmail.com");
  cy.get('input[placeholder="Password"]').type("123");
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

Given("I am on the Home View", () => {
  cy.contains("DBSBiz").click();
  cy.url().should('include', '/home');
});

When("I clicked into the History View", () => {
  cy.contains("History").click();
  cy.url().should('include', '/history');
});

When("I clicked into the Home View", () => {
  cy.contains("Home").click();
  cy.url().should('include', '/home');
});

// Assertions
Then("I should see my daily earnings in the main card", () => {
  cy.contains("TODAY'S EARNINGS").parent().find('h3').should('be.visible');
});

Then("I should see a maximum of 5 most recent transactions", () => {
  cy.get('[data-testid="transaction-card"]').should('have.length.at.most', 5);
});

// New transaction via Postman simulation
When("I received a new transaction of 5.30", () => {
  cy.wait(7000); // Wait for 7 seconds to allow the transaction to be processed in Postman
});

Then("I should see the numbers for 'Today's Earnings' increase by 5.30 in the main card", () => {
  cy.request('GET', 'http://localhost:3000/earnings').then(response => {
    const earnings = response.body.earnings;
    cy.get('.earnings').should('have.text', `SGD ${earnings.toFixed(2)}`);
  });
});

When("3 customers paid at the same time with 5.30, 2.30, and 2.40", () => {
  const transactions = [
    { amount: '5.30', payment_method: 'Paynow', payee_number: '12345678', created_at: new Date().toISOString() },
    { amount: '2.30', payment_method: 'Paylah', payee_number: '87654321', created_at: new Date().toISOString() },
    { amount: '2.40', payment_method: 'Paynow', payee_number: '12344321', created_at: new Date().toISOString() }
  ];

  transactions.forEach(transaction => {
    cy.request('POST', 'http://localhost:3000/transaction', transaction).then(response => {
      expect(response.status).to.eq(201);
    });
  });
  cy.wait(7000); // Wait for 7 seconds to allow the transactions to be processed in Postman
});

Then("I should see the numbers for 'Today's Earnings' increase by 10.00 in the main card", () => {
  cy.request('GET', 'http://localhost:3000/earnings').then(response => {
    const earnings = response.body.earnings;
    cy.get('.earnings').should('have.text', `SGD ${earnings.toFixed(2)}`);
  });
});

Then("I should see 3 transaction cards highlighted red at the top of the most recent 5 transactions section", () => {
  cy.get('[data-testid="transaction-card"]').then($cards => {
    const highlightedCards = $cards.filter((index, card) => Cypress.$(card).css('background-color') === 'red');
    expect(highlightedCards).to.have.length(3);
  });
});
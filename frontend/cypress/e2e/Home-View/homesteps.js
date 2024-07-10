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

Given("I am on the Home View", () => {
  cy.contains("DBSBiz").should('be.visible');
});

Then("I should see my daily earnings and my most recent transactions in the top red card", () => {
  cy.get('.top-red-card').within(() => {
    cy.contains("Daily Earnings").should('be.visible');
    cy.contains("Most Recent Transactions").should('be.visible');
  });
});

Then("I should see a maximum of 5 most recent transactions", () => {
  cy.get('.most-recent-transactions').within(() => {
    cy.get('.transaction-item').should('have.length.at.most', 5);
  });
});

When("I click into the History View", () => {
  cy.contains("History").click();
});

When("I click into the Home View", () => {
  cy.contains("Home").click();
});

When("I receive a new transaction of {float}", (amount) => {
  // Simulate receiving a new transaction
  cy.window().then((win) => {
    win.receiveTransaction(amount);
  });
});

When("3 customers pay at the same time with {float}, {float}, and {float}", (amount1, amount2, amount3) => {
  // Simulate receiving multiple transactions
  cy.window().then((win) => {
    win.receiveTransaction(amount1);
    win.receiveTransaction(amount2);
    win.receiveTransaction(amount3);
  });
});

Then("I should see the numbers for 'Today’s Earnings' increase by {float}", (total) => {
  cy.get('.top-red-card').within(() => {
    cy.contains(`Today’s Earnings: ${total}`).should('be.visible');
  });
});

Then("I should see the transaction of {float} showing on the Most Recent Transaction section in the top red card", (amount) => {
  cy.get('.top-red-card').within(() => {
    cy.contains(`Transaction: ${amount}`).should('be.visible');
  });
});

Then("I should see 3 transaction cards highlighted red at the top of the most recent 5 transactions section", () => {
  cy.get('.most-recent-transactions').within(() => {
    cy.get('.transaction-item.highlighted').should('have.length', 3);
  });
});

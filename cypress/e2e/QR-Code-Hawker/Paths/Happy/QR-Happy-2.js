import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

// Common steps
Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type('iamlove@gmail.com');
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

// Step definition for "The input field is 0"
Then("The input field is 0", () => {
  cy.get('[data-testid="input-field"]').should('have.value', '0');
});

// Step definition for "I clicked on the add button for the Chicken Cutlet Noodle item"
When("I clicked on the add button for the Chicken Cutlet Noodle item", () => {
  cy.get('[data-testid="add-chicken-cutlet-noodle"]').click(); // Assuming the button has this data-testid
});

// Step definition for "I should see the input field amount increase by 6.00"
Then("I should see the input field amount increase by 6.00", () => {
  cy.get('[data-testid="input-field"]').should('have.value', '6.00');
});

// Step definition for "I should see the next button turn red"
Then("I should see the next button turn red", () => {
    cy.get('[data-testid="generate-button"]').should('have.css', 'background-color', 'rgb(253, 90, 119)'); // Matching the actual color
  });
  
  // Additionally, check if the button is enabled
  Then("I should see the next button is enabled", () => {
    cy.get('[data-testid="generate-button"]').should('not.be.disabled');
  });
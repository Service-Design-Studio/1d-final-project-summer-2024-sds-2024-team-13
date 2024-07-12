import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

// Common steps
Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type('iamgay@gmail.com');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

// Navigation steps
Given("I am on Payment View", () => {
  cy.visit('/payment');
  cy.url().should('include', '/payment');
});

Then("The input field is 0", () => {
  cy.get('[data-testid="input-field"]').should('have.value', '0');
});

When("I clicked on the add button for the Chicken Cutlet Noodle item", () => {
  cy.get('[data-testid="add-chicken-cutlet-noodle"]').click(); // Assuming the button has this data-testid
});

Then("I should see the input field amount increase by 6.00", () => {
  cy.get('[data-testid="input-field"]').should('have.value', '6.00');
});

Then("I should see the next button turn red", () => {
  cy.get('[data-testid="next-button"]').should('have.css', 'background-color', 'rgb(255, 0, 0)'); // Assuming the button turns red
});
import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

// Common steps
Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]', { timeout: 10000 }).type('chicken@gmail.com');
  cy.get('input[placeholder="Password"]', { timeout: 10000 }).type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

// Navigation steps
Given("I am on Home View", () => {
  cy.contains("DBSBiz").click();
  cy.url().should('include', '/home');
});


// Scenario: Setting Menu via Auto-Generation
When("I click into the More View", () =>{
  cy.visit('/settings');
  cy.url().should('include', '/settings');
});

Then('I should see a "Menu Preset" button', () => {
  cy.contains('Menu Preset', { timeout: 10000 }).should('be.visible');
});

Then('I click the "Menu Preset" button', () => {
  cy.contains('Menu Preset').click();
});

Then('I should see an option for "Auto-Generate Menu Items"', () => {
  cy.contains('Auto-Generate Menu Item(s)').should('be.visible');
});

When('I click into the "Auto-Generate Menu Items" option', () => {
  cy.contains('Auto-Generate Menu Item(s)').click();
});

Then('I should see instructions', () => {
  cy.contains("Please upload a photo of your stall's menu").should('be.visible');
});

Then('I should click instructions', () => {
  cy.contains("Please upload a photo of your stall's menu").should('be.visible');
});

Then("I browse and select the upload image button", (seafood) => {
  cy.get('[data-testid="file-browser-input"]').attachFile(`../images/seafood.jpg`);
});

Then("I should see a preview of the selected image", () => {
  cy.get('[data-testid="image-preview"]').should('be.visible');
});

When("I click on the {string} button", (buttonText) => {
  cy.contains(buttonText).click();
});

Then("I should see the menu items auto-generated based on the selected image", () => {
  cy.get('[data-testid^="menu-item-"]', { timeout: 20000 }).should('be.visible');
});

Then("I click on the continue button", () => {
  cy.get('[data-testid="auto-continue"]', { timeout: 20000 }).click()
});


Then("I should see the new menu items in the Menu View", () => {
  cy.url({ timeout: 20000 }).should('include', '/settings/menu-preset');
  cy.get('[data-testid="menu-items"]', { timeout: 20000 }).should('be.visible');
});


Then("I should see menu item Tiger Prawn in the Menu View", () => {
  cy.contains('Tiger Prawn',  {timeout: 20000} ).should('be.visible');
});

Then("I click into menu item Tiger Prawn", () => {
  cy.contains('Tiger Prawn').click();
});

Then("I should see the edit page of menu item Tiger Prawn", () => {
  cy.url().should('include', '/edititem'); // Adjust based on actual URL structure
  cy.contains('Edit Menu Item').should('be.visible'); // Adjust based on actual page content
});

When("I click on the price", () => {
  cy.get('[data-testid="item-price-input"]').click(); // Adjust based on actual element
});

Then("I clear the price", () => {
  cy.get('[data-testid="item-price-input"]').clear(); // Adjust based on actual element
});

Then("I input 15.00", () => {
  cy.get('[data-testid="item-price-input"]').type('15.00'); // Adjust based on actual element
});

Then("I click the Confirm button", () => {
  cy.get('[data-testid="confirm-item-button"]').click(); // Adjust based on actual button text or identifier
});

Then("I should see the price of menu item Tiger Prawn as '$15.00'", () => {
  cy.contains('Tiger Prawn').parent().contains('$15.00').should('be.visible');
});

// Scenario: Auto-generating from a non-Menu
Then("I browse and select a non-Menu", () => {
  cy.get('[data-testid="file-browser-input"]').attachFile('non_menu_image.jpg'); // Adjust file name and path
});

Then("I should see an error message", () => {
  cy.contains('Error').should('be.visible'); // Adjust based on actual error message
});

// Scenario: Inputting a negative amount
When("I press '-' on the keypad", () => {
  cy.get(`[data-testid="keypad"] button`).contains('-').click();
});

Then("I should see a grey text '5.20-'", () => {
  cy.get('[data-testid="input-field"]').should('have.value', '5.20-').and('have.css', 'color', 'rgb(169, 169, 169)'); // Adjust color based on actual implementation
});

Then("I should see see the input field update to '-0.80'", () => {
  cy.get('[data-testid="input-field"]').should('have.value', '-0.80');
});

Then("I should see a Next button disabled", () => {
  cy.get('[data-testid="generate-button"]').should('be.disabled');
});

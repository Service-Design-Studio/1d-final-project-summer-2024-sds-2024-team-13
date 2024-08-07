import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

// Common steps
Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]', { timeout: 10000 }).type('higoogle@gmail.com');
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

Then("I upload an image of Tiger Prawn", () => {
    cy.get('[data-testid="item-image-input"]').attachFile(`../images/tiger-prawn.jpg`);
  });


Then("I click the Confirm button", () => {
  cy.get('[data-testid="confirm-item-button"]').click(); // Adjust based on actual button text or identifier
});

Then("I should see the price of menu item Tiger Prawn as {string}", function (string) {
  cy.contains('$15.00').should('be.visible');
});

// Scenario: Missing a menu item
Then ("I click on Add Menu button", () => {
  cy.get('[data-testid="add-item-button"]', { timeout: 20000 }).click();
});

Then ("I fill up item name", () => {
  cy.get('[data-testid="input_name-add"]').type('Ban Mian');
});

Then ("I fill up item number", () => {
  cy.get('[data-testid="input_num-add"]').type('1');
});

Then ("I fill up item price", () => {
  cy.get('[data-testid="input_money-add"]').type('4.50');
});

Then ("I click on Confirm button", () => {
  cy.get('[data-testid="confirm-item-button"]').click();
});

Then ("I can see the newly created item", () => {
  cy.contains('Ban Mian', {timeout: 20000}).should('be.visible');
});

// Scenario: Auto-generating from a non-menu with words
Then("I browse and select a non-Menu with no words", () => {
  cy.get('[data-testid="file-browser-input"]').attachFile(`../images/demo-image.png`); // Adjust file name and path
});

Then("I should see an error message", () => {
  cy.contains('Failed to generate menu items. Please try again with a clearer photo.',  {timeout: 20000}).should('be.visible'); // Adjust based on actual error message
});

Then("I should see a retry button and click on it", () => {
  cy.get('[data-testid="auto-retry"]', {timeout: 20000}).should('be.visible');
  cy.get('[data-testid="auto-retry"]', {timeout: 20000}).click()
});

Then("I should be redirected to menu-preset view", () => {
  cy.visit('/settings/menu-preset');
  cy.url().should('include', '/settings/menu-preset');
});


// Scenario: Inputting a negative amount
Then("I click into the Payment View", () => {
  cy.visit('/payment');
  cy.url().should('include', '/payment');
});

Then("I should see an input field with 0", () => {
  cy.get('[data-testid="input-field"]', { timeout: 10000 }).should('have.value', '0');
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


Then("I should see a Next button disabled", () => {
  cy.get('[data-testid="generate-button"]').should('be.disabled');
});
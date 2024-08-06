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
  cy.get('[data-testid="instructions"]').should('be.visible');
});

When("I browse and select the file {string}", (fileName) => {
  cy.get('[data-testid="file-browser-input"]').attachFile(`path/to/${fileName}`);
});

Then("I should see a preview of the selected image", () => {
  cy.get('[data-testid="image-preview"]').should('be.visible');
});

When("I click on the {string} button", (buttonText) => {
  cy.contains(buttonText).click();
});

Then("I should see the menu items auto-generated based on the selected image", () => {
  cy.get('[data-testid="auto-generated-menu-items"]').should('be.visible');
});

Then("I should see the new menu items in the Menu View", () => {
  cy.get('[data-testid="menu-view"]').find('[data-testid="menu-item"]').should('have.length.greaterThan', 0);
});

// Scenario: Clicking On Menu
Given("I am on Payment View", () => {
  cy.visit('/payment');
  cy.url().should('include', '/payment');
});

Then("The input field is 0", () => {
  cy.get('[data-testid="input-field"]', { timeout: 10000 }).should('have.value', '0');
});

When("I clicked on the add button for the Chicken Cutlet Noodle item", () => {
  cy.get('[data-testid="add-chicken-cutlet-noodle"]').click(); // Assuming the button has this data-testid
});

Then("I should see the input field amount increase by 6.00", () => {
  cy.get('[data-testid="input-field"]').should('have.value', '6.00');
});

Then("I should see the next button turn red", () => {
  cy.get('[data-testid="generate-button"]').should('have.css', 'background-color', 'rgb(253, 90, 119)'); // Matching the actual color
});

Then("I should see the next button is enabled", () => {
  cy.get('[data-testid="generate-button"]').should('not.be.disabled');
});

// Using Custom Keypad
When("I click into the Payment View", () => {
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

Then("I should see a Next button", () => {
  cy.get('[data-testid="generate-button"]').should('exist');
});

When("I click the Next button", () => {
  cy.window().then((win) => {
    cy.spy(win.console, 'log').as('consoleLog');
  });
  cy.get('[data-testid="generate-button"]').click();
});

Then("I should be redirected to the QR Pay view", () => {
  cy.url().should('include', '/payment/QRPay');
});

Given("that I am on QR Pay View", () => {
  cy.url().should('include', '/payment/QRPay');
});

When("customer has made the payment within 30 seconds", () => {
  // Simulate waiting for the payment by checking for the hidden element
  cy.get('#qrpay_transactionfound', { timeout: 30000 }).should('exist');
});

Then("I should see an animation", () => {
  cy.get('[data-testid="success-animation"]').should('be.visible');
});

Then("I should be redirected to Payment View after 5 seconds", () => {
  cy.wait(5000);
  cy.url().should('include', '/payment');
});

Then("I should be redirected to Payment View", () => {
  cy.url().should('include', '/payment');
});

// New step definitions for Feature: QR Sad Path

// Scenario: Auto-generating from a Menu with missing labels
Then("I click on upload image button", () => {
  cy.contains('Upload Image').click(); // Adjust based on actual button text or identifier
});

Then("I browse and select a Menu with missing labels", () => {
  cy.get('[data-testid="file-browser-input"]').attachFile('menu_with_missing_labels.jpg'); // Adjust file name and path
});

Then("I should see menu item Tiger Prawn in the Menu View", () => {
  cy.contains('Tiger Prawn').should('be.visible');
});

Then("I should see price of menu item Tiger Prawn as '$?.??'", () => {
  cy.contains('Tiger Prawn').parent().contains('$?.??').should('be.visible');
});

When("I click into menu item Tiger Prawn", () => {
  cy.contains('Tiger Prawn').click();
});

Then("I should see the edit page of menu item Tiger Prawn", () => {
  cy.url().should('include', '/edit-menu-item'); // Adjust based on actual URL structure
  cy.contains('Edit Menu Item').should('be.visible'); // Adjust based on actual page content
});

When("I click on the price", () => {
  cy.get('[data-testid="price-input"]').click(); // Adjust based on actual element
});

Then("I clear the price", () => {
  cy.get('[data-testid="price-input"]').clear(); // Adjust based on actual element
});

Then("I input 15.00", () => {
  cy.get('[data-testid="price-input"]').type('15.00'); // Adjust based on actual element
});

Then("I click the Confirm button", () => {
  cy.contains('Confirm').click(); // Adjust based on actual button text or identifier
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

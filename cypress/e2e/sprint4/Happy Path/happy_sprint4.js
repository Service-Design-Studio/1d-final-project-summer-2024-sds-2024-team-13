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


//Scenario: Clicking On Menu
Given("I am on Payment View", () => {
  cy.visit('/payment');
  cy.url().should('include', '/payment');
});

// Step definition for "The input field is 0"
Then("The input field is 0", () => {
  cy.get('[data-testid="input-field"]', { timeout: 10000 }).should('have.value', '0');
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

//Using Custom Keypad
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


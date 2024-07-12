import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";

// Common steps
Before(() => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Phone Number"]').type('12345678');
  cy.get('input[placeholder="Password"]').type('$2a$12$YF9U4unxEUSTeLRIzDu7NeQVsrLNR0RYYZ3qSbOgoACCAHiuK3vzC');
  cy.contains("LOG IN").click();
  cy.contains("DBSPay", { timeout: 10000 }).should('be.visible');
});

Given("I am on Scanning View", () => {
  cy.contains("DBSPay").click();
  cy.url().should('include', '/payment');
});

When("I scan a valid QR code", () => {
  const qrCodeImagePath = 'cypress/support/assets/correctPay.png';

  cy.fixture(qrCodeImagePath, 'base64').then((image) => {
    // Simulate scanning the QR code by injecting the image into the video element
    cy.get('video').then(($video) => {
      const videoElement = $video[0];
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const img = new Image();
      img.src = `data:image/png;base64,${image}`;
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        // Mock the video frame
        videoElement.srcObject = canvas.captureStream();
      };
    });
  });

  cy.wait(5000); // Adjust the wait time as needed for the scanning to process
  cy.url().should('include', '/payment/review');
});

Then("I should be redirected to Payment Review view", () => {
  cy.url().should('include', '/payment/review');
});

Then("I should see a payment amount as $10.40", () => {
  cy.get('.amount').should('contain', 'SGD 10.40');
});

Then("I should see a LET'S GO button", () => {
  cy.get('button').contains("LET'S GO").should('be.visible');
});

When("I click the LET'S GO button", () => {
  cy.get('button').contains("LET'S GO").click();
  cy.url().should('include', '/payment/success');
});

Then("I should be redirected to Payment Success view", () => {
  cy.url().should('include', '/payment/success');
});

Then("I should see an animation", () => {
  cy.get('.successIcon').should('be.visible');
});

Then("I should see a payment amount as $10.40", () => {
  cy.get('.amount').should('contain', 'SGD 10.40');
});

Then("I should see a logout button", () => {
  cy.get('button').contains('Log Out').should('be.visible');
});
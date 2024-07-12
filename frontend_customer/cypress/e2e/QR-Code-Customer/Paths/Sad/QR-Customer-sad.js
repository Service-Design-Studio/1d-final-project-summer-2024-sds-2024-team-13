import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import QRCode from 'qrcode';

Given("I am on Scanning View", () => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Phone Number"]').type('12345678');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
  cy.contains("DBSPay", { timeout: 10000 }).should('be.visible');
});

Given("I am on Scanning View", () => {
  cy.contains("DBSPay").click();
  cy.url().should('include', '/payment');
});

When("I scan a valid QR code", () => {
  const qrCodeImagePath = 'cypress/support/assets/wrongPay.png';

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

And("I see a wrong payment amount of $1040.00", () => {
  cy.get('.amount').should('contain', 'SGD 1040.00');
});

And("I should see a Back button", () => {
  cy.get('button').contains("Back").should('be.visible');
});

When("I click the Back button", () => {
  cy.get('button').contains("Back").click();
});

Then("I should be redirected to Scanning view", () => {
  cy.url().should('include', '/payment');
});


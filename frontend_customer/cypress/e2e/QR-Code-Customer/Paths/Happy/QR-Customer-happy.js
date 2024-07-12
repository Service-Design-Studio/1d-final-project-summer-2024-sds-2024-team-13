import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import QRCode from 'qrcode';

Given("I am on Scanning View", () => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type('iamgay@gmail.com');
  cy.get('input[placeholder="Password"]').type('123');
  cy.contains("LOG IN").click();
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
  cy.wait(5000);
  cy.url().should('include', '/payment/review');
});

Then("I should be redirected to Payment Review view", () => {
  cy.url().should('include', '/payment/review');
});


Then("I should see a payment amount as $10.40", () => {
  cy.get('.amount').should('contain', 'SGD 10.40');
});

And("I should see a LET'S GO button", () => {
  cy.get('button').contains("LET'S GO").should('be.visible');
});

When("I click the LET'S GO button", () => {
  cy.get('button').contains("LET'S GO").click();
  cy.url().should('include', '/payment/success'); // Verify that it navigates to the success page
});

Then("I should be redirected to Payment Success view", () => {
  cy.url().should('include', '/payment/success');
});

And("I should see an animation", () => {
  cy.get('.successIcon').should('be.visible');
});

And("I should see a payment amount as $10.40", () => {
  cy.get('.amount').should('contain', 'SGD 10.40');
});

And("I should see a logout button", () => {
  cy.get('button').contains('Log Out').should('be.visible');
});
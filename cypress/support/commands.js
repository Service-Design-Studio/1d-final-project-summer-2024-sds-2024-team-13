// cypress/support/commands.js
import 'cypress-file-upload';

Cypress.Commands.add('login', () => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Email"]').type("iamgay@gmail.com");
  cy.get('input[placeholder="Password"]').type("123");
  cy.contains("LOG IN").click();
  cy.contains("DBSBiz", { timeout: 10000 }).should('be.visible');
});

Cypress.Commands.add('preserveSession', () => {
  let sessionData;
  cy.window().then((win) => {
    sessionData = {
      localStorage: JSON.stringify(win.localStorage),
      sessionStorage: JSON.stringify(win.sessionStorage),
      cookies: JSON.stringify(win.document.cookie.split('; ')),
    };
  });

  Cypress.env('sessionData', sessionData);
});

Cypress.Commands.add('restoreSession', () => {
  const sessionData = Cypress.env('sessionData');
  if (sessionData) {
    cy.window().then((win) => {
      const data = JSON.parse(sessionData);
      Object.keys(data.localStorage).forEach((key) => {
        win.localStorage.setItem(key, data.localStorage[key]);
      });
      Object.keys(data.sessionStorage).forEach((key) => {
        win.sessionStorage.setItem(key, data.sessionStorage[key]);
      });
      data.cookies.forEach((cookie) => {
        document.cookie = cookie;
      });
    });
  }
});

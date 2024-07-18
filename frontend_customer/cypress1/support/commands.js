// cypress/support/commands.js

Cypress.Commands.add('login', () => {
  cy.viewport('iphone-6+');
  cy.visit("/");
  cy.get('input[placeholder="Phone Number"]').type('12345678');
  cy.get('input[placeholder="Password"]').type('$2a$12$YF9U4unxEUSTeLRIzDu7NeQVsrLNR0RYYZ3qSbOgoACCAHiuK3vzC');
  cy.contains("LOG IN").click();
  cy.contains("DBSPay", { timeout: 10000 }).should('be.visible');
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

Cypress.Commands.add("loginByApi", (email, password) => {
    cy.request({
      method: 'POST',
      url: '/users/login', // the endpoint in your Rails app
      body: {
        email: email,
        password: password
      }
    }).then((response) => {
      // Assuming your API returns a token that you need to store
      window.localStorage.setItem('token', response.body.token);
      cy.setCookie('token', response.body.token); // if using cookies
    });
  });
  
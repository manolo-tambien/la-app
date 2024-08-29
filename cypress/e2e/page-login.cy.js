describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Displays the login form', () => {
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#login-btn').should('be.visible');
  });

  it('Allow the user to write over the form', ()=>{
    cy.get('#email').should('be.visible');
    cy.get('#password').should('be.visible');

    cy.get('#email').type('magpags@gmail.com');
    cy.get('#password').type('PasswordPotente');
  });

  it('Submits the login form', () => {
    cy.get('#email').type('magpags@gmail.com');
    cy.get('#password').type('PasswordPotente');
    cy.get('#login-btn').click();

    // Verifica que la petición fue hecha y se redirigió al dashboard
    //cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('eq', '/');
    cy.get('h1').contains('Home');
  });

  // it('Displays an error message if the credentials are incorrect', () => {
  //   cy.get('#email').type('incorrect@email.com');
  //   cy.get('#password').type('IncorrectPassword');
  //   cy.get('#login-btn').click();
  //   cy.get('h1').contains('Wrong Credenntials');
  // });
});


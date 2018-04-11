const faker = require('faker');

describe('Test login', () => {
  beforeEach(() => {
    cy.fixture('equeo_locators.json').as('locators');
    cy.fixture('equeo_test_data.json').as('data');
    cy.visit('/');
  });
  
  it('Login positive', function() {
    cy.get(this.locators.authorizationScreen.loginField)
      .type(this.data.user.login)
      .should('have.value', this.data.user.login);

    cy.get('@data').then(data => {
      cy.get('#loginform-password')
        .type(data.user.password)
        .should('have.value', data.user.password);
    });

    cy.get('#loginform-rememberme-styler').should('not.have.class', 'checked')
      .then(checkbox => {
        checkbox.click();
        expect(checkbox).to.have.class('checked');
      });
    
    // Error message
    cy.get(this.locators.authorizationScreen.loginButton).click();
    cy.url().should('be.eq', "https://test-equeo.ru/");
    cy.contains(this.data.learnScreen.screenName);
  });

  it('Login negative', function() {
    const randomLogin = faker.name.firstName();
    const randomPass = faker.lorem.word();


    cy.get(this.locators.authorizationScreen.loginField)
      .should('be.empty')
      .type(randomLogin)
      .should('have.value', randomLogin);

    cy.get(this.locators.authorizationScreen.passField)
      .should('be.empty')
      .type(randomPass)
      .should('have.value', randomPass);
    
    cy.get(this.locators.authorizationScreen.loginButton).click();
    cy.get(this.locators.authorizationScreen.errorMessage)
      .contains(this.data.authorizationScreen.wrongLoginPasswordMessage);
  })

  // only
  it('Run custom function', function() {
    cy.customAlert('it works!');
  });
});

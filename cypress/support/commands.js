 // Use this command to Login
 Cypress.Commands.add('login', (text) => {
    cy.visit('https://www.saucedemo.com/')
    // Enter Username  
    cy.get('[data-test="username"]').type('standard_user')
    // Enter Password  
    cy.get('[data-test="password"]').type('secret_sauce')
    // Click Login button
    cy.get('[data-test="login-button"]').click()
    // Assert user is on the home (inventory) page
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
  }) 
 // Use this command to fill in the CHECKOUT: YOUR INFORMATION form
 Cypress.Commands.add('checkout_form', (text) => {
    cy.get('[data-test="firstName"]').type('Joe')
    cy.get('[data-test="lastName"]').type('Bloggs')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
  }) 
  
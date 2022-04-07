  // =========================================================
  // Navigation and adding item to the cart then purchasing it
  // =========================================================
  describe('Login and add item to cart then checkout and purchase', () => {
    it('Verify the navigation buttons on the cart and checkout work as expected and the user can purchase an item', () => {
    cy.login() //command found in commands.js
    // Click on Add to Cart on Sauce Labs Backpack
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    // Assert the cart icon now has a number 1 in it to show 1 item has added then click it
    cy.get('.shopping_cart_link > .shopping_cart_badge').should('have.text', '1').and('be.visible').click()
    // Assert user is on YOUR CART page
    cy.url().should('eq', 'https://www.saucedemo.com/cart.html')
    // Assert correct item has ben added to the cart (Sauce Labs Backpack)
    cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack')
    //Assert the quantity of Sauce Labs backpacks is 1
    cy.get('.cart_quantity').should('have.text', '1')
    // Assert Continue shopping button navigates the user back to the homepage
    cy.get('[data-test="continue-shopping"]').click()
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    // Return to YOUR CART page
    cy.go('back')
    // Click Checkout button
    cy.get('[data-test="checkout"]').click()
    // Assert URL is on the CHECKOUT: YOUR INFORMATION page
    cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-one.html')
    cy.get('.title').should('have.text', 'Checkout: Your Information')
    // Assert Cancel button navigates the user back to the YOUR CART page
    cy.get('[data-test="cancel"]').click()
    cy.url().should('eq', 'https://www.saucedemo.com/cart.html')
    // Return to CHECKOUT: YOUR INFORMATION page
    cy.go('back')
    // Fill in the form and click Continue
    cy.get('[data-test="firstName"]').type('Joe')
    // Assert First Name text field now reads 'Joe'
    cy.get('[data-test="firstName"]').should('have.value', 'Joe').and('be.visible')
    cy.get('[data-test="lastName"]').type('Bloggs')
    // Assert Last Name text field now reads 'Bloggs'
    cy.get('[data-test="lastName"]').should('have.value', 'Bloggs').and('be.visible')
    cy.get('[data-test="postalCode"]').type('12345')
    // Assert Zip/PostalCode text field now reads '12345'
    cy.get('[data-test="postalCode"]').should('have.value', '12345').and('be.visible')
    cy.get('[data-test="continue"]').click()
    // Assert user is on the CHECKOUT: OVERVIEW page
    cy.url().should('eq', 'https://www.saucedemo.com/checkout-step-two.html')
    cy.get('.title').should('have.text', 'Checkout: Overview')
    //Assert item quantity is still 1 and click Finish
    cy.get('.cart_quantity').should('have.text', '1')
    // Assert Cancel button navigates the user back to the Home page
    cy.get('[data-test="cancel"]').click()
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    // Return to CHECKOUT: OVERVIEW page
    cy.go('back')
    cy.get('[data-test="finish"]').click()
    // Assert user is on the CHECKOUT: COMPLETE! page
    cy.url().should('eq', 'https://www.saucedemo.com/checkout-complete.html')
    cy.get('.title').should('have.text', 'Checkout: Complete!')
    cy.get('.complete-header').should('have.text', 'THANK YOU FOR YOUR ORDER')
    cy.get('.complete-text').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!')
    // Assert the cart icon returns to default and does not contain an item quantity number
    cy.get('.shopping_cart_link > .shopping_cart_badge').should('not.exist')
    //Assert Back Home button takes the user back to the home (inventory) page
    cy.get('[data-test="back-to-products"]').click()
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
  }) 
})
// =========================================================
// Adding and removing items while on homepage and item page
// =========================================================
describe('Adding and removing multiple items while on homepage and on specific item pages', () => {
  it('Verify the user can add and remove items from their cart while on the homepage', () => {  
    // Assert number of items added while on the homepage is reflected in the cart icon
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]')
    // Assert the cart icon now has a number 3 in it to show 3 items have been added
    cy.get('.shopping_cart_link > .shopping_cart_badge').should('have.text', '3').and('be.visible')
    // Assert the cart icon now has a number 1 in it to show items have been removed
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('[data-test="remove-sauce-labs-onesie"]').click()
    cy.get('.shopping_cart_link > .shopping_cart_badge').should('have.text', '1').and('be.visible').click()
  })
  it('Verify the user can add and remove items while on specific item pages', () => {  
    cy.login() //command found in commands.js
    // Click on Sauce Labs Bolt T-Shirt
    cy.get('#item_1_img_link > .inventory_item_img').click()
    // Add to cart
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    cy.go('back')
    // Click on Sauce Labs Fleece Jacket
    cy.get('#item_5_img_link > .inventory_item_img')
    // Add to cart
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
    // Assert the cart icon now has a number 2 in it to show 2 items have been added
    cy.get('.shopping_cart_link > .shopping_cart_badge').should('have.text', '2').and('be.visible')
    // Click on Sauce Labs Bolt T-Shirt
    cy.get('#item_1_img_link > .inventory_item_img').click()
    // Click Remove
    cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click()
    // Assert the cart icon now has a number 1 in it to show 1 item has been removed
    cy.get('.shopping_cart_link > .shopping_cart_badge').should('have.text', '1').and('be.visible')
  })
})
// ====================
// Checkout form errors
// ====================
describe('CHECKOUT: YOUR INFORMATION form errors', () => {
  it('Verify the user can not submit an empty form', () => {  
    cy.login() //command found in commands.js
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="continue"]').click()
    // Assert red error modal displays
    cy.get('[data-test="error"]').should('have.text', 'Error: First Name is required').and('be.visible')
    // Assert First Name has an error x next to it
    cy.get('.checkout_info > :nth-child(1) > .svg-inline--fa > path').should('be.visible')
    // Assert Last Name has an error x next to it
    cy.get(':nth-child(2) > .svg-inline--fa > path').should('be.visible')
    // Assert Zip/Postal Code has an error x next to it
    cy.get(':nth-child(3) > .svg-inline--fa').should('be.visible')
    // Assert clicking the x button closes the error modal
    cy.get('.error-button > .svg-inline--fa').click()
    cy.get('[data-test="error"]').should('not.exist')
    // Assert First Name error no longer displays
    cy.get('.checkout_info > :nth-child(1) > .svg-inline--fa > path').should('not.exist')
    // Assert Last Name error no longer displays
    cy.get(':nth-child(2) > .svg-inline--fa > path').should('not.exist')
    // Assert Zip/Postal Code error no longer displays
    cy.get(':nth-child(3) > .svg-inline--fa').should('not.exist')
  })
  it('Verify the first Name field displays an error if all but First Name is filled in', () => {  
    // Assert Last name error displays
    cy.get('[data-test="lastName"]').type('Bloggs')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should('have.text', 'Error: First Name is required').and('be.visible')
  })
  it('Verify the Last Name field displays an error if all but Last Name is filled in', () => {  
    // Assert Last name error displays
    cy.get('[data-test="lastName"]').clear()
    cy.get('[data-test="firstName"]').type('Joe')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should('have.text', 'Error: Last Name is required').and('be.visible')
  })
  it('Verify the Zip/Postcode field displays an error if all but is Zip/Postcode filled in', () => {  
    // Assert Zip/Postcode error displays
    cy.get('[data-test="postalCode"]').clear()
    cy.get('[data-test="lastName"]').type('Bloggs')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should('have.text', 'Error: Postal Code is required').and('be.visible')
  })
})
// =========================================================
// Removing items from YOUR CART page and total cost updates
// =========================================================
describe('Removing items and total cost', () => {
  beforeEach(() => {
    cy.login() //command found in commands.js
  })
  it('Verify the user can remove items on the YOUR CART page and total cost of all items is correctly reflected on CHECKOUT: OVERVIEW', () => {  
    //Adding items to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click()
    // Navigate to CHECKOUT: OVERVIEW page
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="firstName"]').type('Joe')
    cy.get('[data-test="lastName"]').type('Bloggs')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    // Assert total cost is correct
    cy.get('.summary_total_label').should('have.text', 'Total: $58.29').and('be.visible')
    // Return to your cart and remove 1 item
    cy.get('[data-test="cancel"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="remove-sauce-labs-onesie"]').click()
    // Assert onesie has been removed on the YOUR CART page
    cy.get('#item_2_title_link > .inventory_item_name').should('not.exist')
    // Return to the CHECKOUT: OVERVIEW page and check removal of Onesie is reflected in total cost and no longer displaying
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    cy.checkout_form() //command found in commands.js
    cy.get('.summary_total_label').should('have.text', 'Total: $49.66').and('be.visible')
    // Assert Onesie has been removed from the CHECKOUT: OVERVIEW page
    cy.get('#item_2_title_link > .inventory_item_name').should('not.exist')
  })
  it('Verify clicking on the item on CHECKOUT: OVERVIEW page takes the user to the item page', () => {
    // Add items and Navigate back to YOUR CART
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    cy.checkout_form() //command found in commands.js
    // Click on Backpack
    cy.get('#item_4_title_link > .inventory_item_name').click()
    // Assert user us on Sauce Labs Backpack page
    cy.url().should('eq', 'https://www.saucedemo.com/inventory-item.html?id=4')
    cy.go('back')
    // Click on Sauce Labs Bolt T-Shirt
    cy.get('#item_1_title_link > .inventory_item_name').click()
    // Assert user us on Sauce Labs Bolt T-Shirt page
    cy.url().should('eq', 'https://www.saucedemo.com/inventory-item.html?id=1')
    cy.go('back')
  })
  it('Verify clicking on the item on YOUR CART page takes the user to the item page', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    cy.get('.shopping_cart_link').click()
    // Click on Backpack
    cy.get('#item_4_title_link > .inventory_item_name').click()
    // Assert user us on Sauce Labs Backpack page
    cy.url().should('eq', 'https://www.saucedemo.com/inventory-item.html?id=4')
    cy.go('back')
    // Click on Sauce Labs Bolt T-Shirt
    cy.get('#item_1_title_link > .inventory_item_name').click()
    // Assert user us on Sauce Labs Bolt T-Shirt page
    cy.url().should('eq', 'https://www.saucedemo.com/inventory-item.html?id=1')
  })
  it('Verify the user cannot purchase an empty Cart', () => {
    cy.get('.shopping_cart_link').click()
    // Checkout button should not exist if the user has no items in their basket ========= Please note this test will fail as the site does actually allow you to purchase an empty cart =========
    cy.get('[data-test="checkout"]').should('not.exist')
  })
  it('Verify the Checkout button is removed when removing the last item in Your Cart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    // Checkout button should not exist if the user has no items in their basket ========= Please note this test will fail as the site does actually allow you to purchase an empty cart =========
    cy.get('[data-test="checkout"]').should('not.exist')
  })
})

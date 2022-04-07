# How to run these tests
The quickest and easiest way to run Cypress tests out of the box is by downloading the desktop version so you don’t have to mess around with NPM but if you do want to, there is a full guide here https://docs.cypress.io/guides/getting-started/installing-cypress#What-you-ll-learn

1.	Download Cypress desktop here https://download.cypress.io/desktop
2.	Unzip the folder and run the Cypress.exe
3.	Clone/download this repo
4.	Open the root Delio Task folder in Cypress desktop buy either dragging it in or by manually selecting it
5. Click Run in the test runner
 Test files can be found in Delio-task-main\cypress\integration\delio-task


# Test Cases/scenarios
The below is a summary of the scenarios/test cases in the automation script
*	Adding an item to the cart and verifying cart icon updates with number of items added
*	Clicking on the cart icon and verifying user is on Your Cart page
*	Checking correct item and quantity was added to the cart on Your Cart page
*	Verifying all navigation buttons on the Checkout/Cart take user to correct pages
*	Verifying user can fill in the Your Information form and have the correct values
*	Verifying the user cannot submit a blank form
*	Verifying red error modal appears and the x button closes it, dismissing all errors
*	Verifying the user cannot submit a form if all but 1 field is filled in for each of them
*	Verifying item quantity is still the same on the Checkout Overview page
*	Verifying the user can complete the order by clicking Finish and the cart icon return to default (no number)
*	Verifying user can add and remove items on specific item pages
*	Verifying user can add and remove items on the Home page
*	Verifying that removing items will update the total cost on the Checkout Overview page
*	Verifying clicking on the item links on the Checkout Overview page navigates the user to that item page 
*	Verifying clicking on the item links on the Your Cart page navigates the user to that item page 
*	Verifying the user cannot purchase an empty cart - (functionality not implemented so test fails)
*	Verifying the Checkout button is removed when removing the last item in Your Cart to prevent purchasing an empty cart - (functionality not implemented so test fails)

# Notes
Invalid formats in the checkout form appear to be accepted, there is no functionality to prevent this. Below are some test cases I would include if it was.
*	Going over maximum character limits for all fields
*	Using special characters for all fields
*	Entering an incorrect Zip/Postal code e.g ‘1’
*	Entering a space in all fields

I also included tests to see if you can checkout with no items in your basket which appears you can so these last 2 tests will fail due to it.
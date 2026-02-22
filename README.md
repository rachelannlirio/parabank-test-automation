# parabank-test-automation

Automation test suite for ParaBank web app

To install dependencies

1. Navigate to root directory of the project
2. `npm install`
3. `npx playwright install`

To run test in headless mode  
`npm t`  
`npm test`

To run test in headed mode  
`npm run test:headed`

To view test report  
`npm run test:report`

## Test Steps:

1. Navigate to Para bank application.
2. Create a new user from user registration page (Ensure username is generated randomly and it is unique in every test execution).
3. Login to the application with the user created in step 2. _(No need for this step because user is automatically logged in after registration.)_
4. Verify if the Global navigation menu in home page is working as expected.
   - upper left navigation menu links
   - upper right navigation menu icons

5. Create a Savings account from “Open New Account Page” and capture the account number.
6. Validate if Accounts overview page is displaying the balance details as expected.
7. Transfer funds from account created in step 5 to another account.
8. Pay the bill with account created in step 5.
9. Add necessary assertions at each test step whenever it is needed.

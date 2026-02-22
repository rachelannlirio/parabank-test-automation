import { expect } from '@playwright/test'
import { test } from '../../fixtures/testFixture'
import { BALANCES } from '../../utils/constants'
import {
  generateRandomAmount,
  generateRandomUserData,
} from '../../utils/randomGenerator'
import {
  Account,
  AccountsSnapshot,
  TransferFundsDetails,
  User,
} from '../../utils/types'

test.describe('UI E2E Tests', () => {
  let userData: User
  test.beforeEach(({}) => {
    userData = generateRandomUserData()
  })

  test('Newly registered user can perform various actions', async ({
    pageManager,
  }) => {
    await test.step('Navigate to ParaBank home page', async () => {
      await pageManager.home.open()
      await expect(pageManager.home.registerLink).toBeVisible()
    })

    await test.step('Create new user from user registration page', async () => {
      await pageManager.home.clickRegisterLink()
      await expect(pageManager.register.registerHeader).toBeVisible()
      await pageManager.register.registerNewUser(userData)
      await pageManager.accountDashboard.verifyWelcomeMessage(userData.username)
    })

    // await test.step('Verify upper left Global Navigation menu is working as expected', async () => {
    //   await pageManager.headerNavigation.clickAboutUsLink()
    //   await expect.soft(pageManager.aboutUs.aboutUsHeader).toBeVisible()

    //   await pageManager.headerNavigation.clickServicesLink()
    //   await expect
    //     .soft(pageManager.services.servicesHeader)
    //     .toHaveText(LABELS.servicesHeader)

    //   await pageManager.headerNavigation.clickProductsLink()
    //   await expect.soft(pageManager.products.productsHeader).toBeVisible()
    //   // Navigate back to account dashboard because the current page is not part of the ParaBank web app
    //   await pageManager.accountDashboard.open()

    //   /**
    //    * I consider the succeeding step failed because the link says "Locations"
    //    * and I expected it to show a list of the ParaSoft office locations,
    //    * but instead it redirected to the Solutions page.
    //    * Either the link should be renamed to "Solutions", or
    //    * it should navigate to the ParaSoft "Contact Us" page that lists the office locations.
    //    */
    //   await pageManager.headerNavigation.clickLocationsLink()
    //   await expect.soft(pageManager.contactUs.globalOfficesHeader).toBeVisible()
    //   // Navigate back to account dashboard because the current page is not part of the ParaBank web app
    //   await pageManager.accountDashboard.open()

    //   await pageManager.headerNavigation.clickAdminPageLink()
    //   await expect.soft(pageManager.adminPage.adminPageHeader).toBeVisible()
    // })

    // await test.step('Verify upper right Global Navigation menu is working as expected', async () => {
    //   await pageManager.headerNavigation.clickHomeLink()
    //   await expect
    //     .soft(pageManager.accountDashboard.latestNewsHeader)
    //     .toBeVisible()

    //   await pageManager.headerNavigation.clickAboutLink()
    //   await expect.soft(pageManager.aboutUs.aboutUsHeader).toBeVisible()

    //   await pageManager.headerNavigation.clickContactLink()
    //   await expect
    //     .soft(pageManager.customerCare.customerCareHeader)
    //     .toBeVisible()
    // })

    let initialAccountsSnapshot: AccountsSnapshot
    let initialAccount: Account
    let newAccountId: string
    let newAccount: Account
    // A newly registered user is expected to have only one account.
    await test.step('Take a snapshot of the account balances before creating a new account', async () => {
      await pageManager.accountServicesMenu.clickAccountsOverviewLink()
      initialAccountsSnapshot =
        await pageManager.accountsOverview.getAccountsSnapshot()
      initialAccount = initialAccountsSnapshot.accounts[0]
    })

    await test.step('Verify user can create a new account', async () => {
      await pageManager.accountServicesMenu.clickOpenNewAccountLink()
      await expect
        .soft(pageManager.openNewAccount.openNewAccountHeader)
        .toBeVisible()

      await pageManager.openNewAccount.openNewAccount()
      await expect(
        pageManager.openNewAccount.accountOpenedMessage,
      ).toBeVisible()
      newAccountId = (await pageManager.openNewAccount.getNewAccountNumber())!
    })

    await test.step('Verify Accounts Overview is displaying the balance details as expected', async () => {
      await pageManager.accountServicesMenu.clickAccountsOverviewLink()
      const currentAccountsSnapshot =
        await pageManager.accountsOverview.getAccountsSnapshot()
      // console.log(
      //   'Current accounts snapshot:',
      //   JSON.stringify(currentAccountsSnapshot, null, 2),
      // )
      newAccount = currentAccountsSnapshot.accounts.find(
        (account) => account.accountId == newAccountId,
      ) as Account
      expect(newAccount.balance).toEqual(BALANCES.newAccountBalance)
      initialAccount = await pageManager.accountsOverview.getInitialAccount()
      // $100 was automatically transferred to the new account
      expect(initialAccount.balance).toEqual(
        BALANCES.initialAccountBalance - BALANCES.newAccountBalance,
      )
      // Total balance is not expected to change
      expect(currentAccountsSnapshot.totalBalance).toEqual(
        BALANCES.initialAccountBalance,
      )
    })

    await test.step('Transfer funds from the newly created account to another account', async () => {
      await pageManager.accountServicesMenu.clickTransferFundsLink()
      await expect
        .soft(pageManager.transferFunds.transferFundsHeader)
        .toBeVisible()

      const transferFundsDetails: TransferFundsDetails = {
        fromAccount: newAccount,
        toAccount: initialAccount,
        amount: generateRandomAmount(1, newAccount.balance),
      }
      await pageManager.transferFunds.transferFunds(transferFundsDetails)
      await pageManager.transferFunds.verifyTransferMessage(
        transferFundsDetails,
      )
    })

    // await test.step('Pay a bll with the newly created account', async () => {
    //   await pageManager.accountServicesMenu.clickBillPayLink()
    //   await expect.soft(pageManager.billPay.billPayHeader).toBeVisible()

    //   const amountToPay = generateRandomAmount(1, newAccount.balance)
    //   const billPayDetails = generateRandomBillPayDetails(
    //     amountToPay,
    //     newAccount,
    //   )
    //   await pageManager.billPay.payBill(billPayDetails)
    //   await pageManager.billPay.verifyBillPayMessage(billPayDetails)
    // })
  })
})

import { expect } from '@playwright/test'
import { test } from '../../fixtures/testFixture'
import { BALANCES } from '../../utils/constants'
import { generateRandomUserData } from '../../utils/randomGenerator'
import { AccountDetails, User } from '../../utils/types'

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
      console.log('Home page opened')
      await expect(pageManager.home.registerLink).toBeVisible()
    })

    await test.step('Create new user from user registration page', async () => {
      await pageManager.home.clickRegisterLink()
      await expect(pageManager.register.registerHeader).toBeVisible()
      await pageManager.register.registerNewUser(userData)
      await pageManager.accountDashboard.verifyWelcomeMessage(
        userData.firstName,
      )
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

    let initialFirstAccount: AccountDetails
    let newAccount: AccountDetails
    let updatedFirstAccount: AccountDetails
    // Take a snapshot of the account balances before creating a new account, then compare it with the snapshot after creating a new account to verify that the balance details are updated as expected in the Accounts Overview page.
    await test.step('Take a snapshot of the account balances before creating a new account', async () => {
      await pageManager.accountServicesMenu.clickAccountsOverviewLink()
      await expect(
        pageManager.accountsOverview.accountsOverviewHeader,
      ).toBeVisible()
      await expect(pageManager.accountsOverview.accountsTable).toBeVisible()
      initialFirstAccount =
        await pageManager.accountsOverview.getFirstAccountDetails()
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
    })

    await test.step('Verify Accounts Overview is displaying the balance details as expected', async () => {
      await pageManager.accountServicesMenu.clickAccountsOverviewLink()
      await expect(
        pageManager.accountsOverview.accountsOverviewHeader,
      ).toBeVisible()
      await expect(pageManager.accountsOverview.accountsTable).toBeVisible()

      newAccount = await pageManager.accountsOverview.getNewAccountDetails()
      expect(newAccount.balance).toEqual(BALANCES.newAccountBalance)
      updatedFirstAccount =
        await pageManager.accountsOverview.getFirstAccountDetails()
      expect(updatedFirstAccount.balance).toEqual(
        BALANCES.updatedFirstAccountBalance,
      )
      const totalBalance = await pageManager.accountsOverview.getTotalBalance()
      expect(totalBalance).toEqual(BALANCES.totalBalance)
    })
  })
})

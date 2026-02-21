import { expect } from '@playwright/test'
import { test } from '../../fixtures/testFixture'
import { LABELS } from '../../utils/constants'
import { generateRandomUserData } from '../../utils/randomGenerator'
import { User } from '../../utils/types'

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

    await test.step('Verify upper left Global Navigation menu is working as expected', async () => {
      await pageManager.headerNavigation.clickAboutUsLink()
      await expect.soft(pageManager.aboutUs.aboutUsHeader).toBeVisible()

      await pageManager.headerNavigation.clickServicesLink()
      await expect
        .soft(pageManager.services.servicesHeader)
        .toHaveText(LABELS.servicesHeader)

      await pageManager.headerNavigation.clickProductsLink()
      await expect.soft(pageManager.products.productsHeader).toBeVisible()
      // Navigate back to account dashboard because the current page is not part of the ParaBank web app
      await pageManager.accountDashboard.open()

      /**
       * I consider the succeeding step failed because the link says "Locations"
       * and I expected it to show a list of the ParaSoft office locations,
       * but instead it redirected to the Solutions page.
       * Either the link should be renamed to "Solutions", or
       * it should navigate to the ParaSoft "Contact Us" page that lists the office locations.
       */
      await pageManager.headerNavigation.clickLocationsLink()
      await expect.soft(pageManager.contactUs.globalOfficesHeader).toBeVisible()
      // Navigate back to account dashboard because the current page is not part of the ParaBank web app
      await pageManager.accountDashboard.open()

      await pageManager.headerNavigation.clickAdminPageLink()
      await expect.soft(pageManager.adminPage.adminPageHeader).toBeVisible()
    })

    await test.step('Verify upper right Global Navigation menu is working as expected', async () => {
      await pageManager.headerNavigation.clickHomeLink()
      await expect
        .soft(pageManager.accountDashboard.latestNewsHeader)
        .toBeVisible()

      await pageManager.headerNavigation.clickAboutLink()
      await expect.soft(pageManager.aboutUs.aboutUsHeader).toBeVisible()

      await pageManager.headerNavigation.clickContactLink()
      await expect
        .soft(pageManager.customerCare.customerCareHeader)
        .toBeVisible()
    })
  })
})

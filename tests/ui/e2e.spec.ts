import { expect } from "@playwright/test"
import { test } from "../../fixtures/testFixture"
import { generateRandomUserData } from "../../utils/randomGenerator"
import { User } from "../../utils/types"
import { verify } from "node:crypto"

test.describe("UI E2E Tests", () => {
  let userData: User
  test.beforeEach(({}) => {
    userData = generateRandomUserData()
  })

  test("Newly registered user can perform various actions", async ({
    pageManager,
  }) => {
    await test.step("Navigate to ParaBank home page", async () => {
      await pageManager.home.open()
      console.log("Home page opened")
      await expect(pageManager.home.registerLink).toBeVisible()
    })
    await test.step("Create new user from user registration page", async () => {
      await pageManager.home.clickRegisterLink()
      await expect(pageManager.register.registerHeader).toBeVisible()
      await pageManager.register.registerNewUser(userData)
      await pageManager.accountDashboard.verifyWelcomeMessage(
        userData.firstName,
      )
    })
  })
})

import { expect } from '@playwright/test'
import { test } from '../../fixtures/testFixture'

test.describe('UI E2E Tests', () => {
  test('Navigate to ParaBank web application', async ({ pageManager }) => {
    await pageManager.home.open()
    await pageManager.home.clickRegisterLink()
    await expect(pageManager.register.registerHeader).toBeVisible()
  })
})
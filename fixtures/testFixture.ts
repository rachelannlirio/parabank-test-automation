import { test as base } from '@playwright/test'
import PageManager from '../pages/PageManager'

type Fixtures = {
  pageManager: PageManager
}

export const test = base.extend<Fixtures>({
  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page)
    await use(pageManager)
  },
})

export { expect } from '@playwright/test'
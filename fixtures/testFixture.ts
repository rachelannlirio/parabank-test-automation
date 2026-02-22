import { APIRequestContext, test as base } from '@playwright/test'
import PageManager from '../pages/PageManager'

type Fixtures = {
  pageManager: PageManager
  request: APIRequestContext
}

export const test = base.extend<Fixtures>({
  pageManager: async ({ page }, use) => {
    const pageManager = new PageManager(page)
    await use(pageManager)
  },
  request: async ({ request }, use) => {
    await use(request)
  },
})

export { expect } from '@playwright/test'

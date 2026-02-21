import { expect, type Locator, type Page } from '@playwright/test'
import { Base } from './Base'

export class Home extends Base {

  private static readonly LABELS = {
    registerLink: 'Register',
  } as const;

  constructor(protected page: Page) {
    super(page)
  }

  async open(path: string = '/parabank/index.htm') {
    await this.goTo(path)
  }

  get registerLink() {
    return this.page.getByRole('link', { name: Home.LABELS.registerLink })
  }

  async clickRegisterLink() {
    await this.registerLink.click()
  }
}
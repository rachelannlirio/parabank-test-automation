import { type Page } from '@playwright/test'
import { PATHS } from '../../utils/constants'
import { ParaBankBase } from './ParaBankBase'

export class Home extends ParaBankBase {
  private static readonly LABELS = {
    registerLink: 'Register',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  async open() {
    await super.open(PATHS.home)
  }

  get registerLink() {
    return this.page.getByRole('link', { name: Home.LABELS.registerLink })
  }

  async clickRegisterLink() {
    await this.registerLink.click()
  }
}

import { Page } from '@playwright/test'

export class Base {
  protected readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async open(path: string) {
    await this.page.goto(path)
  }
}

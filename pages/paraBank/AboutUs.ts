import { Page } from '@playwright/test'
import { ParaBankBase } from './ParaBankBase'

export class AboutUs extends ParaBankBase {
  private static readonly LABELS = {
    aboutUsHeader: 'ParaSoft Demo Website',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  get aboutUsHeader() {
    return this.page.getByRole('heading', {
      name: AboutUs.LABELS.aboutUsHeader,
    })
  }
}

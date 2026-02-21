import { Page } from '@playwright/test'
import { PATHS } from '../../utils/constants'
import { ParaSoftBase } from './ParaSoftBase'

export class ContactUs extends ParaSoftBase {
  private static readonly LABELS = {
    contactUsHeader: 'Contact Us',
    globalOfficesHeader: 'Parasoft Global Offices',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  async open() {
    await super.open(PATHS.parasoftContactUs)
  }

  get contactUsHeader() {
    return this.page.getByRole('heading', {
      name: ContactUs.LABELS.contactUsHeader,
    })
  }

  get globalOfficesHeader() {
    return this.page.getByRole('heading', {
      name: ContactUs.LABELS.globalOfficesHeader,
    })
  }
}

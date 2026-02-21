import { Page } from '@playwright/test'
import { ParaBankBase } from './ParaBankBase'

export class Services extends ParaBankBase {
  private static readonly LABELS = {
    servicesHeader: 'Available Bookstore SOAP services:',
  }

  private static readonly SELECTORS = {
    rightPanel: '#rightPanel',
    servicesHeader: 'span.heading',
  } as const

  constructor(page: Page) {
    super(page)
  }
  get rightPanel() {
    return this.page.locator(Services.SELECTORS.rightPanel)
  }

  get servicesHeader() {
    return this.rightPanel.locator(Services.SELECTORS.servicesHeader).first()
  }
}

import { Page } from '@playwright/test'
import { ParaBankBase } from './ParaBankBase'

export class AdminPage extends ParaBankBase {
  private static readonly LABELS = {
    adminPageHeader: 'Administration',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  get adminPageHeader() {
    return this.page.getByRole('heading', {
      name: AdminPage.LABELS.adminPageHeader,
    })
  }
}

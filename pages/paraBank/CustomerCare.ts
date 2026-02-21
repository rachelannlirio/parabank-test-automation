import { Page } from '@playwright/test'
import { ParaBankBase } from './ParaBankBase'

export class CustomerCare extends ParaBankBase {
  private static readonly LABELS = {
    customerCareHeader: 'Customer Care',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  get customerCareHeader() {
    return this.page.getByRole('heading', {
      name: CustomerCare.LABELS.customerCareHeader,
    })
  }
}

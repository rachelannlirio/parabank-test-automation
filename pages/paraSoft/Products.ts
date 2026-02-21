import { Page } from '@playwright/test'
import { ParaSoftBase } from './ParaSoftBase'

export class Products extends ParaSoftBase {
  private static readonly LABELS = {
    productsHeader: 'Find the Testing Solution That Fits Your Team Perfectly',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  get productsHeader() {
    return this.page.getByRole('heading', {
      name: Products.LABELS.productsHeader,
    })
  }
}

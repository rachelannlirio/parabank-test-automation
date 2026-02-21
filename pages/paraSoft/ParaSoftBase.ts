import { Page } from '@playwright/test'
import { Base } from '../Base'

export class ParaSoftBase extends Base {
  constructor(protected page: Page) {
    super(page)
  }
}

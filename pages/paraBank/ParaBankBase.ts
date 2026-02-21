import { Page } from '@playwright/test'
import { Base } from '../Base'
import { HeaderNavigation } from './HeaderNavigation'

export class ParaBankBase extends Base {
  private readonly headerNavigation: HeaderNavigation

  constructor(protected page: Page) {
    super(page)
    this.headerNavigation = new HeaderNavigation(page)
  }
}

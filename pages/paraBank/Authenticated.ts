import { Page } from '@playwright/test'
import { AccountServicesMenu } from './accountServices/AccountServicesMenu'
import { ParaBankBase } from './ParaBankBase'

export class Authenticated extends ParaBankBase {
  private readonly accountServicesMenu: AccountServicesMenu

  constructor(protected page: Page) {
    super(page)
    this.accountServicesMenu = new AccountServicesMenu(page)
  }
}

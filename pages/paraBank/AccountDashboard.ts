import { expect, Page } from '@playwright/test'
import { PATHS } from '../../utils/constants'
import { ParaBankBase } from './ParaBankBase'

export class AccountDashboard extends ParaBankBase {
  private static readonly LABELS = {
    accountCreated:
      'Your account was created successfully. You are now logged in.',
    atmServices: 'ATM Services',
    latestNewsHeader: 'Latest News',
  } as const

  private static readonly SELECTORS = {
    rightPanel: '#rightPanel',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  async open() {
    await super.open(PATHS.accountDashboard)
  }

  get rightPanel() {
    return this.page.locator(AccountDashboard.SELECTORS.rightPanel)
  }

  get atmServices() {
    return this.rightPanel.getByRole('listitem', {
      name: AccountDashboard.LABELS.atmServices,
    })
  }

  get latestNewsHeader() {
    return this.rightPanel.getByRole('heading', {
      name: AccountDashboard.LABELS.latestNewsHeader,
    })
  }

  async verifyWelcomeMessage(firstName: string) {
    await expect(
      this.rightPanel.getByRole('heading', { name: `Welcome ${firstName}` }),
    ).toBeVisible()
  }
}

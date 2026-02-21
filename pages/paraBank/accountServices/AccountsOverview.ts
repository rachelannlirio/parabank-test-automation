import { Page } from '@playwright/test'
import { PATHS } from '../../../utils/constants'
import { AccountDetails } from '../../../utils/types'
import { Authenticated } from '../Authenticated'

export class AccountsOverview extends Authenticated {
  private static readonly LABELS = {
    accountsOverviewHeader: 'Accounts Overview',
  } as const

  private static readonly SELECTORS = {
    accountsTable: '#accountTable',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  async open() {
    await super.open(PATHS.accountsOverview)
  }

  get accountsOverviewHeader() {
    return this.page.getByRole('heading', {
      name: AccountsOverview.LABELS.accountsOverviewHeader,
    })
  }

  get accountsTable() {
    return this.page.locator(AccountsOverview.SELECTORS.accountsTable)
  }

  async getAccountRow(index: number) {
    return this.accountsTable.locator('tbody tr').nth(index)
  }

  async getAccountDetails(index: number): Promise<AccountDetails> {
    const accountRow = await this.getAccountRow(index)
    const accountId = await accountRow.locator('td').first().innerText()
    // const accountLink = accountRow.locator('td a').first()
    const balance = await accountRow.locator('td').nth(1).innerText()
    const availableAmount = await accountRow.locator('td').nth(2).innerText()
    return {
      accountId,
      balance,
      availableAmount,
    } as AccountDetails
  }

  async getFirstAccountDetails(): Promise<AccountDetails> {
    return this.getAccountDetails(0)
  }

  // Assuming there are only 2 accounts
  async getNewAccountDetails(): Promise<AccountDetails> {
    return this.getAccountDetails(1)
  }

  async getTotalBalance(): Promise<string> {
    const totalBalanceRow = this.accountsTable.locator('tbody tr').last()
    const totalBalance = await totalBalanceRow.locator('td').nth(1).innerText()
    return totalBalance
  }
}

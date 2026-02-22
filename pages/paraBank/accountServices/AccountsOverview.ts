import { expect, Page } from '@playwright/test'
import { PATHS } from '../../../utils/constants'
import { convertToNumber } from '../../../utils/converter'
import { Account, AccountsSnapshot } from '../../../utils/types'
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

  get accountRows() {
    return this.accountsTable.locator('tbody tr').filter({
      hasNot: this.page.getByRole('cell', { name: /Total/i }),
    })
  }

  get totalBalanceRow() {
    return this.accountsTable.locator('tbody tr').last()
  }

  async verifyAccountsOverviewPage() {
    await expect(this.accountsOverviewHeader).toBeVisible()
    await expect(this.accountsTable).toBeVisible()
  }

  getAccountRow(index: number) {
    return this.accountRows.nth(index)
  }

  async getAccountDetails(index: number): Promise<Account> {
    const accountRow = this.getAccountRow(index)
    // Account ID in the first column
    const accountId = await accountRow.locator('td').first().innerText()
    // Balance in the second column
    const balance = await accountRow.locator('td').nth(1).innerText()
    const availableAmount = await accountRow.locator('td').nth(2).innerText()
    return {
      accountId,
      balance: convertToNumber(balance),
      availableAmount: convertToNumber(availableAmount),
    } as Account
  }

  async getInitialAccount(): Promise<Account> {
    return this.getAccountDetails(0)
  }

  // Assuming there are only 2 accounts
  async getNewAccount(): Promise<Account> {
    return this.getAccountDetails(1)
  }

  async getTotalBalance(): Promise<number> {
    const totalBalance = await this.totalBalanceRow
      .locator('td')
      .nth(1)
      .innerText()
    return convertToNumber(totalBalance)
  }

  async getAccountsSnapshot(): Promise<AccountsSnapshot> {
    await this.verifyAccountsOverviewPage()
    const accountCount = await this.accountRows.count()
    const accounts: Account[] = []
    for (let i = 0; i < accountCount; i++) {
      const accountDetails = await this.getAccountDetails(i)
      accounts.push(accountDetails)
    }
    const totalBalance = await this.getTotalBalance()
    return {
      accounts: accounts,
      totalBalance,
    }
  }
}

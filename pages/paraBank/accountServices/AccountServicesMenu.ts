import { Page } from '@playwright/test'

export class AccountServicesMenu {
  private static readonly LABELS = {
    accountServicesHeader: 'Account Services',
    openNewAccountLink: 'Open New Account',
    accountsOverviewLink: 'Accounts Overview',
    transferFundsLink: 'Transfer Funds',
    billPayLink: 'Bill Pay',
    findTransactionsLink: 'Find Transactions',
    updateContactInfoLink: 'Update Contact Info',
    requestLoanLink: 'Request Loan',
    logOutLink: 'Log Out',
  } as const

  constructor(protected page: Page) {}

  get accountServicesHeader() {
    return this.page.getByRole('heading', {
      name: AccountServicesMenu.LABELS.accountServicesHeader,
    })
  }

  get openNewAccountLink() {
    return this.page.getByRole('link', {
      name: AccountServicesMenu.LABELS.openNewAccountLink,
    })
  }

  get accountsOverviewLink() {
    return this.page.getByRole('link', {
      name: AccountServicesMenu.LABELS.accountsOverviewLink,
    })
  }

  get transferFundsLink() {
    return this.page.getByRole('link', {
      name: AccountServicesMenu.LABELS.transferFundsLink,
    })
  }

  get billPayLink() {
    return this.page.getByRole('link', {
      name: AccountServicesMenu.LABELS.billPayLink,
    })
  }

  get findTransactionsLink() {
    return this.page.getByRole('link', {
      name: AccountServicesMenu.LABELS.findTransactionsLink,
    })
  }

  get updateContactInfoLink() {
    return this.page.getByRole('link', {
      name: AccountServicesMenu.LABELS.updateContactInfoLink,
    })
  }

  get requestLoanLink() {
    return this.page.getByRole('link', {
      name: AccountServicesMenu.LABELS.requestLoanLink,
    })
  }

  get logOutLink() {
    return this.page.getByRole('link', {
      name: AccountServicesMenu.LABELS.logOutLink,
    })
  }

  async waitForAccountsToLoad() {
    await this.page.waitForResponse(
      /\/parabank\/services_proxy\/bank\/customers\/\d+\/accounts/,
    )
  }

  async clickOpenNewAccountLink() {
    await this.openNewAccountLink.click()
    await this.waitForAccountsToLoad()
  }

  async clickAccountsOverviewLink() {
    await this.accountsOverviewLink.click()
    await this.waitForAccountsToLoad()
  }

  async clickTransferFundsLink() {
    await this.transferFundsLink.click()
    await this.waitForAccountsToLoad()
  }

  async clickBillPayLink() {
    await this.billPayLink.click()
  }

  async clickFindTransactionsLink() {
    await this.findTransactionsLink.click()
  }

  async clickUpdateContactInfoLink() {
    await this.updateContactInfoLink.click()
  }

  async clickRequestLoanLink() {
    await this.requestLoanLink.click()
  }

  async clickLogOutLink() {
    await this.logOutLink.click()
  }
}

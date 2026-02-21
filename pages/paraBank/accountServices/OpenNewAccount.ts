import { Page } from '@playwright/test'
import { Authenticated } from '../Authenticated'

export class OpenNewAccount extends Authenticated {
  private static readonly LABELS = {
    openNewAccountHeader: 'Open New Account',
    // openNewAccountButton: 'Open New Account',
    accountOpenedMessage: 'Account Opened!',
  } as const

  private static readonly SELECTORS = {
    openAccountForm: '#openAccountForm',
    accountTypeSelect: '#type',
    fromAccountSelect: '#fromAccountId',
    newAccountId: '#newAccountId',
    openNewAccountButton: 'input[type="button"][value="Open New Account"]',
  }

  constructor(protected page: Page) {
    super(page)
  }

  get openNewAccountHeader() {
    return this.page.getByRole('heading', {
      name: OpenNewAccount.LABELS.openNewAccountHeader,
    })
  }

  get openAccountForm() {
    return this.page.locator(OpenNewAccount.SELECTORS.openAccountForm)
  }

  get accountTypeSelect() {
    return this.openAccountForm.locator(
      OpenNewAccount.SELECTORS.accountTypeSelect,
    )
  }

  get fromAccountSelect() {
    return this.openAccountForm.locator(
      OpenNewAccount.SELECTORS.fromAccountSelect,
    )
  }

  get openNewAccountButton() {
    return this.openAccountForm.locator(
      OpenNewAccount.SELECTORS.openNewAccountButton,
    )
  }

  get accountOpenedMessage() {
    return this.page.getByRole('heading', {
      name: OpenNewAccount.LABELS.accountOpenedMessage,
    })
  }

  get newAccountId() {
    return this.page.locator(OpenNewAccount.SELECTORS.newAccountId)
  }

  async clickOpenNewAccountButton() {
    await this.openNewAccountButton.click()
  }

  async openNewAccount() {
    await this.page.waitForResponse(
      /\/parabank\/services_proxy\/bank\/customers\/\d+\/accounts/,
    )
    await this.accountTypeSelect.selectOption({ label: 'SAVINGS' })
    await this.clickOpenNewAccountButton()
    await this.page.waitForResponse(
      /\/parabank\/services_proxy\/bank\/createAccount\?customerId=\d+&newAccountType=\d+&fromAccountId=\d+/,
    )
  }

  async getNewAccountIdNumber() {
    return this.newAccountId.textContent()
  }
}

import { expect, Page } from '@playwright/test'
import { TransferFundsDetails } from '../../../utils/types'
import { Authenticated } from '../Authenticated'

export class TransferFunds extends Authenticated {
  private static readonly LABELS = {
    transferFundsHeader: 'Transfer Funds',
    transferComplete: 'Transfer Complete!',
  } as const

  private static readonly SELECTORS = {
    transferForm: '#transferForm',
    fromAccountSelect: '#fromAccountId',
    toAccountSelect: '#toAccountId',
    amountInput: '#amount',
    transferButton: 'input[type="submit"][value="Transfer"]',
    showResult: '#showResult',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  get transferFundsHeader() {
    return this.page.getByRole('heading', {
      name: TransferFunds.LABELS.transferFundsHeader,
    })
  }

  get transferForm() {
    return this.page.locator(TransferFunds.SELECTORS.transferForm)
  }

  get fromAccountSelect() {
    return this.transferForm.locator(TransferFunds.SELECTORS.fromAccountSelect)
  }

  get toAccountSelect() {
    return this.transferForm.locator(TransferFunds.SELECTORS.toAccountSelect)
  }

  get amountInput() {
    return this.transferForm.locator(TransferFunds.SELECTORS.amountInput)
  }

  get transferButton() {
    return this.transferForm.locator(TransferFunds.SELECTORS.transferButton)
  }

  get showResult() {
    return this.page.locator(TransferFunds.SELECTORS.showResult)
  }

  async getTransferMessage() {
    return await this.showResult.getByRole('paragraph').first().textContent()
  }

  async transferFunds(details: TransferFundsDetails) {
    await this.amountInput.fill(details.amount.toString())
    await this.fromAccountSelect.selectOption({
      label: details.fromAccount.accountId,
    })
    await this.toAccountSelect.selectOption({
      label: details.toAccount.accountId,
    })
    await this.transferButton.click()
  }

  async verifyTransferMessage(details: TransferFundsDetails) {
    const expectedMessage = `$${details.amount.toFixed(2)} has been transferred from account #${details.fromAccount.accountId} to account #${details.toAccount.accountId}.`
    const actualMessage = (await this.getTransferMessage())?.trim()
    expect.soft(actualMessage).toBe(expectedMessage)
  }
}

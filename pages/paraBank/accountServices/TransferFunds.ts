import { expect, Page } from '@playwright/test'
import { Authenticated } from '../Authenticated'

export class TransferFunds extends Authenticated {
  private static readonly LABELS = {
    transferFundsHeader: 'Transfer Funds',
    // transferButton: 'Transfer',
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

  async transferFunds(fromAccount: string, toAccount: string, amount: number) {
    await this.amountInput.fill(amount.toString())
    await this.fromAccountSelect.selectOption({ label: fromAccount })
    await this.toAccountSelect.selectOption({ label: toAccount })
    await this.transferButton.click()
  }

  async verifyTransferMessage(
    fromAccount: string,
    toAccount: string,
    amount: number,
  ) {
    const expectedMessage = `$${amount.toFixed(2)} has been transferred from account #${fromAccount} to account #${toAccount}.`
    const actualMessage = await this.getTransferMessage()
    expect.soft(actualMessage).toBe(expectedMessage)
  }
}

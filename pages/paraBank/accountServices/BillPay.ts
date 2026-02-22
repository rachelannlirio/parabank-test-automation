import { expect, Page } from '@playwright/test'
import { BillPayDetails } from '../../../utils/types'
import { Authenticated } from '../Authenticated'

export class BillPay extends Authenticated {
  private static readonly LABELS = {
    billPayHeader: 'Bill Pay',
    billPayCompleteHeader: 'Bill Payment Complete',
  } as const

  private static readonly SELECTORS = {
    billPayForm: '#billpayForm',
    payeeNameInput: 'input[name="payee.name"]',
    payeeAddressInput: 'input[name="payee.address.street"]',
    payeeCityInput: 'input[name="payee.address.city"]',
    payeeStateInput: 'input[name="payee.address.state"]',
    payeeZipCodeInput: 'input[name="payee.address.zipCode"]',
    payeePhoneNumberInput: 'input[name="payee.phoneNumber"]',
    payeeAccountNumberInput: 'input[name="payee.accountNumber"]',
    verifyAccountInput: 'input[name="verifyAccount"]',
    amountInput: 'input[name="amount"]',
    fromAccountSelect: 'select[name="fromAccountId"]',
    sendPaymentButton: 'input[type="button"][value="Send Payment"]',
    billPayResult: '#billpayResult',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  get billPayHeader() {
    return this.page.getByRole('heading', {
      name: BillPay.LABELS.billPayHeader,
    })
  }

  get billPayForm() {
    return this.page.locator(BillPay.SELECTORS.billPayForm)
  }

  get payeeNameInput() {
    return this.billPayForm.locator(BillPay.SELECTORS.payeeNameInput)
  }

  get payeeAddressInput() {
    return this.billPayForm.locator(BillPay.SELECTORS.payeeAddressInput)
  }

  get payeeCityInput() {
    return this.billPayForm.locator(BillPay.SELECTORS.payeeCityInput)
  }

  get payeeStateInput() {
    return this.billPayForm.locator(BillPay.SELECTORS.payeeStateInput)
  }

  get payeeZipCodeInput() {
    return this.billPayForm.locator(BillPay.SELECTORS.payeeZipCodeInput)
  }

  get payeePhoneNumberInput() {
    return this.billPayForm.locator(BillPay.SELECTORS.payeePhoneNumberInput)
  }

  get payeeAccountNumberInput() {
    return this.billPayForm.locator(BillPay.SELECTORS.payeeAccountNumberInput)
  }

  get verifyAccountInput() {
    return this.billPayForm.locator(BillPay.SELECTORS.verifyAccountInput)
  }

  get amountInput() {
    return this.billPayForm.locator(BillPay.SELECTORS.amountInput)
  }

  get fromAccountSelect() {
    return this.billPayForm.locator(BillPay.SELECTORS.fromAccountSelect)
  }

  get sendPaymentButton() {
    return this.billPayForm.locator(BillPay.SELECTORS.sendPaymentButton)
  }

  get billPayResult() {
    return this.page.locator(BillPay.SELECTORS.billPayResult)
  }

  get billPayCompleteHeader() {
    return this.billPayResult.getByRole('heading', {
      name: BillPay.LABELS.billPayCompleteHeader,
    })
  }

  async payBill(details: BillPayDetails) {
    await this.fromAccountSelect.selectOption({
      label: details.fromAccount.accountId,
    })
    await this.payeeNameInput.fill(details.payee.name)
    await this.payeeAddressInput.fill(details.payee.address.street)
    await this.payeeCityInput.fill(details.payee.address.city)
    await this.payeeStateInput.fill(details.payee.address.state)
    await this.payeeZipCodeInput.fill(details.payee.address.zipCode)
    await this.payeePhoneNumberInput.fill(details.payee.phoneNumber)
    await this.payeeAccountNumberInput.fill(details.payee.accountNumber)
    await this.verifyAccountInput.fill(details.payee.accountNumber)
    await this.amountInput.fill(details.amount.toString())
    /**
     * This waitForLoadState is not ideal but a last resort fix to
     * an intermittent issue where the Send Payment button is being clicked
     * before all of the fields in the form are filled out.
     */
    await this.page.waitForLoadState('networkidle')
    await this.sendPaymentButton.click()
  }

  async getBillPayMessage() {
    return await this.billPayResult.getByRole('paragraph').first().textContent()
  }

  async verifyBillPayMessage(details: BillPayDetails) {
    const expectedMessage = `Bill Payment to ${details.payee.name} in the amount of $${details.amount.toFixed(2)} from account ${details.fromAccount.accountId} was successful.`
    const actualMessage = (await this.getBillPayMessage())?.trim()
    expect.soft(actualMessage).toBe(expectedMessage)
  }
}

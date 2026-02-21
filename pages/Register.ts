import { Page } from "@playwright/test"
import { Base } from "./Base"
import { User } from "../utils/types"

export class Register extends Base {
  private static readonly LABELS = {
    registerHeader: "Signing up is easy!",
  } as const

  private static readonly SELECTORS = {
    registrationForm: "#customerForm",
    firstNameField: "#customer\\.firstName",
    lastNameField: "#customer\\.lastName",
    addressField: "#customer\\.address\\.street",
    cityField: "#customer\\.address\\.city",
    stateField: "#customer\\.address\\.state",
    zipCodeField: "#customer\\.address\\.zipCode",
    phoneNumberField: "#customer\\.phoneNumber",
    ssnField: "#customer\\.ssn",
    usernameField: "#customer\\.username",
    passwordField: "#customer\\.password",
    confirmPasswordField: "#repeatedPassword",
    submitButton: 'button[type="submit"]',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  get registerHeader() {
    return this.page.getByRole("heading", {
      name: Register.LABELS.registerHeader,
    })
  }

  get registrationForm() {
    return this.page.locator(Register.SELECTORS.registrationForm)
  }

  get firstNameField() {
    // return this.registrationForm.getByRole("textbox", {
    //   name: "First name",
    // })
    return this.registrationForm.locator(Register.SELECTORS.firstNameField)
  }

  get lastNameField() {
    return this.registrationForm.locator(Register.SELECTORS.lastNameField)
  }

  get addressField() {
    return this.registrationForm.locator(Register.SELECTORS.addressField)
  }

  get cityField() {
    return this.registrationForm.locator(Register.SELECTORS.cityField)
  }

  get stateField() {
    return this.registrationForm.locator(Register.SELECTORS.stateField)
  }

  get zipCodeField() {
    return this.registrationForm.locator(Register.SELECTORS.zipCodeField)
  }

  get phoneNumberField() {
    return this.registrationForm.locator(Register.SELECTORS.phoneNumberField)
  }

  get ssnField() {
    return this.registrationForm.locator(Register.SELECTORS.ssnField)
  }

  get usernameField() {
    return this.registrationForm.locator(Register.SELECTORS.usernameField)
  }

  get passwordField() {
    return this.registrationForm.locator(Register.SELECTORS.passwordField)
  }

  get confirmPasswordField() {
    return this.registrationForm.locator(
      Register.SELECTORS.confirmPasswordField,
    )
  }

  get submitButton() {
    return this.registrationForm.getByRole("button", {
      name: "Register",
    })
    // return this.registrationForm.locator(Register.SELECTORS.submitButton)
  }

  async registerNewUser(user: User) {
    await this.firstNameField.fill(user.firstName)
    await this.lastNameField.fill(user.lastName)
    await this.addressField.fill(user.address.street)
    await this.cityField.fill(user.address.city)
    await this.stateField.fill(user.address.state)
    await this.zipCodeField.fill(user.address.zipCode)
    await this.phoneNumberField.fill(user.phoneNumber)
    await this.ssnField.fill(user.ssn)
    await this.usernameField.fill(user.username)
    await this.passwordField.fill(user.password)
    await this.confirmPasswordField.fill(user.password)
    await this.submitButton.click()
  }
}

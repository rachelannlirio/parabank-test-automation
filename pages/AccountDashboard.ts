import { expect, Page } from "@playwright/test"
import { Base } from "./Base"

export class AccountDashboard extends Base {
  private static readonly LABELS = {
    accountCreated:
      "Your account was created successfully. You are now logged in.",
  } as const

  private static readonly SELECTORS = {
    rightPanel: "#rightPanel",
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  get rightPanel() {
    return this.page.locator(AccountDashboard.SELECTORS.rightPanel)
  }

  get accountCreatedMessage() {
    return this.rightPanel.getByRole("paragraph", {
      name: AccountDashboard.LABELS.accountCreated,
    })
  }

  async verifyWelcomeMessage(firstName: string) {
    await expect(
      this.rightPanel.getByRole("heading", { name: `Welcome ${firstName}` }),
    ).toBeVisible()
  }
}

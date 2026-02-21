import { Page } from "@playwright/test"
import { Base } from "./Base"

export class Register extends Base {
  private static readonly LABELS = {
    registerHeader: 'Signing up is easy!',
  } as const;

  constructor(protected page: Page) {
    super(page)
  }

  get registerHeader() {
    return this.page.getByRole('heading', { name: Register.LABELS.registerHeader })
  }
}
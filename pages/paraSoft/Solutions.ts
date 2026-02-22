import { Page } from '@playwright/test'
import { PATHS } from '../../utils/constants'
import { ParaSoftBase } from './ParaSoftBase'

export class Solutions extends ParaSoftBase {
  private static readonly LABELS = {
    solutionsHeader:
      'The Parasoft Continuous Quality Testing Platform: AI-Powered Test Automation Solutions',
  } as const

  constructor(protected page: Page) {
    super(page)
  }

  async open() {
    await super.open(PATHS.parasoftContactUs)
  }

  get solutionsHeader() {
    return this.page.getByRole('heading', {
      name: Solutions.LABELS.solutionsHeader,
    })
  }
}

import { Page } from "@playwright/test"


export class HeaderNavigation {

  private static readonly SELECTORS = {
    headerPanel: '#headerPanel',
  } as const;

  private static readonly LABELS = {
    aboutUsLink: 'About Us',
    servicesLink: 'Services',
  }

  constructor(protected page: Page) { }

  get headerPanel() {
    return this.page.locator(HeaderNavigation.SELECTORS.headerPanel)
  }

  get aboutUsLink() {
    return this.headerPanel.getByRole('link', { name: HeaderNavigation.LABELS.aboutUsLink })
  }

  get servicesLink() {
    return this.headerPanel.getByRole('link', { name: HeaderNavigation.LABELS.servicesLink })
  }


}
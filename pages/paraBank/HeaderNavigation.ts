import { Page } from '@playwright/test'

export class HeaderNavigation {
  private static readonly SELECTORS = {
    headerPanel: '#headerPanel',
  } as const

  private static readonly LABELS = {
    aboutUsLink: 'About Us',
    servicesLink: 'Services',
    productsLink: 'Products',
    locationsLink: 'Locations',
    adminPageLink: 'Admin Page',

    homeLink: 'home',
    aboutLink: 'about',
    contactLink: 'contact',
  }

  constructor(protected page: Page) {}

  get headerPanel() {
    return this.page.locator(HeaderNavigation.SELECTORS.headerPanel)
  }

  get aboutUsLink() {
    return this.headerPanel.getByRole('link', {
      name: HeaderNavigation.LABELS.aboutUsLink,
    })
  }

  get servicesLink() {
    return this.headerPanel.getByRole('link', {
      name: HeaderNavigation.LABELS.servicesLink,
    })
  }

  get productsLink() {
    return this.headerPanel.getByRole('link', {
      name: HeaderNavigation.LABELS.productsLink,
    })
  }

  get locationsLink() {
    return this.headerPanel.getByRole('link', {
      name: HeaderNavigation.LABELS.locationsLink,
    })
  }

  get adminPageLink() {
    return this.headerPanel.getByRole('link', {
      name: HeaderNavigation.LABELS.adminPageLink,
    })
  }

  get homeLink() {
    return this.headerPanel.getByRole('link', {
      name: HeaderNavigation.LABELS.homeLink,
      exact: true,
    })
  }

  get aboutLink() {
    return this.headerPanel.getByRole('link', {
      name: HeaderNavigation.LABELS.aboutLink,
      exact: true,
    })
  }

  get contactLink() {
    return this.headerPanel.getByRole('link', {
      name: HeaderNavigation.LABELS.contactLink,
      exact: true,
    })
  }

  async clickAboutUsLink() {
    await this.aboutUsLink.click()
  }

  async clickServicesLink() {
    await this.servicesLink.click()
  }

  async clickProductsLink() {
    await this.productsLink.click()
  }

  async clickLocationsLink() {
    await this.locationsLink.click()
  }

  async clickAdminPageLink() {
    await this.adminPageLink.click()
  }

  async clickHomeLink() {
    await this.homeLink.click()
  }

  async clickAboutLink() {
    await this.aboutLink.click()
  }

  async clickContactLink() {
    await this.contactLink.click()
  }
}

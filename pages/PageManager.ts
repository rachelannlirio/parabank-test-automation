import { Page } from '@playwright/test'
import { AboutUs } from './paraBank/AboutUs'
import { AccountDashboard } from './paraBank/AccountDashboard'
import { AccountServicesMenu } from './paraBank/accountServices/AccountServicesMenu'
import { AccountsOverview } from './paraBank/accountServices/AccountsOverview'
import { OpenNewAccount } from './paraBank/accountServices/OpenNewAccount'
import { AdminPage } from './paraBank/AdminPage'
import { CustomerCare } from './paraBank/CustomerCare'
import { HeaderNavigation } from './paraBank/HeaderNavigation'
import { Home } from './paraBank/Home'
import { Register } from './paraBank/Register'
import { Services } from './paraBank/Services'
import { ContactUs } from './paraSoft/ContactUs'
import { Products } from './paraSoft/Products'

/**
 * Centralized PageManager to manage all page objects
 * Provides lazy initialization and consistent access to page objects
 */
class PageManager {
  private _home?: Home
  private _register?: Register
  private _accountDashboard?: AccountDashboard
  private _aboutUs?: AboutUs
  private _services?: Services
  private _adminPage?: AdminPage
  private _customerCare?: CustomerCare
  private _headerNavigation?: HeaderNavigation
  private _accountServicesMenu?: AccountServicesMenu

  private _openNewAccount?: OpenNewAccount
  private _accountsOverview?: AccountsOverview

  private _products?: Products
  private _contactUs?: ContactUs

  constructor(private page: Page) {}

  get home(): Home {
    if (!this._home) {
      this._home = new Home(this.page)
    }
    return this._home
  }

  get register(): Register {
    if (!this._register) {
      this._register = new Register(this.page)
    }
    return this._register
  }

  get accountDashboard(): AccountDashboard {
    if (!this._accountDashboard) {
      this._accountDashboard = new AccountDashboard(this.page)
    }
    return this._accountDashboard
  }

  get aboutUs(): AboutUs {
    if (!this._aboutUs) {
      this._aboutUs = new AboutUs(this.page)
    }
    return this._aboutUs
  }

  get services(): Services {
    if (!this._services) {
      this._services = new Services(this.page)
    }
    return this._services
  }

  get adminPage(): AdminPage {
    if (!this._adminPage) {
      this._adminPage = new AdminPage(this.page)
    }
    return this._adminPage
  }

  get customerCare(): CustomerCare {
    if (!this._customerCare) {
      this._customerCare = new CustomerCare(this.page)
    }
    return this._customerCare
  }

  get accountServicesMenu(): AccountServicesMenu {
    if (!this._accountServicesMenu) {
      this._accountServicesMenu = new AccountServicesMenu(this.page)
    }
    return this._accountServicesMenu
  }

  get headerNavigation(): HeaderNavigation {
    if (!this._headerNavigation) {
      this._headerNavigation = new HeaderNavigation(this.page)
    }
    return this._headerNavigation
  }

  get openNewAccount(): OpenNewAccount {
    if (!this._openNewAccount) {
      this._openNewAccount = new OpenNewAccount(this.page)
    }
    return this._openNewAccount
  }

  get accountsOverview(): AccountsOverview {
    if (!this._accountsOverview) {
      this._accountsOverview = new AccountsOverview(this.page)
    }
    return this._accountsOverview
  }

  get products(): Products {
    if (!this._products) {
      this._products = new Products(this.page)
    }
    return this._products
  }

  get contactUs(): ContactUs {
    if (!this._contactUs) {
      this._contactUs = new ContactUs(this.page)
    }
    return this._contactUs
  }

  getPage(): Page {
    return this.page
  }
}

export default PageManager

import { Page } from '@playwright/test'
import { HeaderNavigation } from './HeaderNavigation'
import { Home } from './Home'
import { Register } from './Register'

/**
 * Centralized PageManager to manage all page objects
 * Provides lazy initialization and consistent access to page objects
 */
class PageManager {

  private _home?: Home
  private _register?: Register
  private _headerNavigation?: HeaderNavigation

  constructor(private page: Page) { }

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

  get headerNavigation(): HeaderNavigation {
    if (!this._headerNavigation) {
      this._headerNavigation = new HeaderNavigation(this.page)
    }
    return this._headerNavigation
  }

  getPage(): Page {
    return this.page
  }
}

export default PageManager
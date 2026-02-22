export type User = {
  firstName: string
  lastName: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
  phoneNumber: string
  ssn: string
  username: string
  password: string
}

export type Account = {
  accountId: string
  balance: number
  availableAmount: number
}

export type AccountsSnapshot = {
  accounts: Account[]
  totalBalance: number
}

export type TransferFundsDetails = {
  fromAccount: Account
  toAccount: Account
  amount: number
}

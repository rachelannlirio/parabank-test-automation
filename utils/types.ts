export type Address = {
  street: string
  city: string
  state: string
  zipCode: string
}

export type User = {
  firstName: string
  lastName: string
  address: Address
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

export type BillPayee = {
  name: string
  address: Address
  phoneNumber: string
  accountNumber: string
}

export type BillPayDetails = {
  payee: BillPayee
  amount: number
  fromAccount: Account
}

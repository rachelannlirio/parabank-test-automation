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

export type AccountDetails = {
  accountId: string
  balance: string
  availableAmount: string
}

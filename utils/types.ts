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
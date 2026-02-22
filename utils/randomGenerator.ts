import { faker, fakerEN_AU } from '@faker-js/faker'
import { User } from './types'

export function generateRandomUserData(): User {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const username = `${firstName}_${faker.string.alphanumeric(8)}`.toLowerCase()
  return {
    firstName: firstName,
    lastName: lastName,
    address: {
      street: fakerEN_AU.location.streetAddress(),
      city: fakerEN_AU.location.city(),
      state: fakerEN_AU.location.state(),
      zipCode: fakerEN_AU.location.zipCode(),
    },
    phoneNumber: fakerEN_AU.phone.number(),
    ssn: fakerEN_AU.helpers.replaceSymbols('###-##-####'),
    username: username,
    password: faker.internet.password({ length: 10 }),
  }
}

export function generateRandomAmount(min: number, max: number): number {
  return parseFloat(faker.finance.amount({ min, max, dec: 2 }))
}

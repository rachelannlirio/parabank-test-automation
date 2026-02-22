import { faker, fakerEN_AU } from '@faker-js/faker'
import { Account, Address, BillPayDetails, BillPayee, User } from './types'

export function generateRandomUserData(): User {
  const firstName = randomFirstName()
  const lastName = randomLastName()
  const username =
    `${faker.internet.username()}_${faker.string.numeric(2)}`.toLowerCase()
  return {
    firstName: firstName,
    lastName: lastName,
    address: randomAddress(),
    phoneNumber: fakerEN_AU.phone.number(),
    ssn: fakerEN_AU.helpers.replaceSymbols('###-##-####'),
    username: username,
    password: faker.internet.password({ length: 10 }),
  }
}

export function generateRandomAmount(min: number, max: number): number {
  return parseFloat(faker.finance.amount({ min, max, dec: 2 }))
}

function randomFirstName(): string {
  return faker.person.firstName()
}

function randomLastName(): string {
  return faker.person.lastName()
}

function randomAddress(): Address {
  return {
    street: fakerEN_AU.location.streetAddress(),
    city: fakerEN_AU.location.city(),
    state: fakerEN_AU.location.state(),
    zipCode: fakerEN_AU.location.zipCode(),
  }
}

export function generateRandomBillPayee(): BillPayee {
  return {
    name: randomFirstName() + ' ' + randomLastName(),
    address: randomAddress(),
    phoneNumber: fakerEN_AU.phone.number(),
    accountNumber: faker.finance.accountNumber(),
  }
}

export function generateRandomBillPayDetails(
  amountToPay: number,
  fromAccount: Account,
): BillPayDetails {
  return {
    payee: generateRandomBillPayee(),
    amount: amountToPay,
    fromAccount: fromAccount,
  }
}

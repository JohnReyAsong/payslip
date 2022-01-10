import gql from 'graphql-tag'

export const USERS = gql`
  query Users {
    users {
      totalCount
      edges {
        id
        firstname
        lastname
        address
        designation
        emailAddress
        role
        department
        baseSalary
        accountNumber
        bankName
      }
    }
  }
`

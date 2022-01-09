import gql from 'graphql-tag'

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input)
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!, $id: ID!) {
    updateUser(input: $input, id: $id)
  }
`

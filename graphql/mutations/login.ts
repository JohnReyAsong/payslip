import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation Authenticate($input: AuthenticateInput!) {
    authenticate(input: $input) {
      token
    }
  }
`

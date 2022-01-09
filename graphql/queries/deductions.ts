import gql from 'graphql-tag'

export const DEDUCTIONS = gql`
  query Deductions {
    deductions {
      totalCount
      edges {
        id
        name
      }
    }
  }
`

import gql from 'graphql-tag'

export const REIMBURSEMENTS = gql`
  query Reimbursements {
    reimbursements {
      totalCount
      edges {
        id
        name
      }
    }
  }
`

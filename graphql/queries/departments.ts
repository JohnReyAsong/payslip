import gql from 'graphql-tag'

export const DEPARTMENTS = gql`
  query Departments {
    departments {
      totalCount
      edges {
        id
        name
      }
    }
  }
`

import gql from 'graphql-tag'

export const DESIGNATIONS = gql`
  query Designation {
    designations {
      totalCount
      edges {
        id
        name
        department {
          id
          name
        }
      }
    }
  }
`

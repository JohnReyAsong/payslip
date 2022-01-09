import gql from 'graphql-tag'

export const BONUSES = gql`
  query Bonuses {
    bonuses {
      totalCount
      edges {
        id
        name
      }
    }
  }
`

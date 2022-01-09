import gql from 'graphql-tag'

export const CREATE_BONUS = gql`
  mutation CreateBonus($input: CreateBonusInput!) {
    createBonus(input: $input)
  }
`

export const UPDATE_BONUS = gql`
  mutation UpdateBonus($input: UpdateBonusInput!, $id: ID!) {
    updateBonus(input: $input, id: $id)
  }
`

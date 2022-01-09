import gql from 'graphql-tag'

export const CREATE_DEDUCTION = gql`
  mutation CreateDeduction($input: CreateDeductionInput!) {
    createDeduction(input: $input)
  }
`

export const UPDATE_DEDUCTION = gql`
  mutation UpdateDeduction($input: UpdateDeductionInput!, $id: ID!) {
    updateDeduction(input: $input, id: $id)
  }
`

import gql from 'graphql-tag'

export const CREATE_REIMBURSEMENT = gql`
  mutation CreateReimbursement($input: CreateReimbursementInput!) {
    createReimbursement(input: $input)
  }
`

export const UPDATE_REIMBURSEMENT = gql`
  mutation UpdateReimbursement($input: UpdateReimbursementInput!, $id: ID!) {
    updateReimbursement(input: $input, id: $id)
  }
`

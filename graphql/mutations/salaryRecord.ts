import gql from 'graphql-tag'

export const CREATE_SALARY_RECORD = gql`
  mutation CreateSalaryRecord($input: CreateSalaryRecordInput!) {
    createSalaryRecord(input: $input)
  }
`

export const UPDATE_SALARY_RECORD = gql`
  mutation UpdateSalaryRecord($input: UpdateSalaryRecordInput!, $id: ID!) {
    updateSalaryRecord(input: $input, id: $id)
  }
`

export const DELETE_SALARY_RECORD = gql`
  mutation DeleteSalaryRecord($id: ID!) {
    deleteSalaryRecord(id: $id)
  }
`

import gql from 'graphql-tag'

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($input: CreateDepartmentInput!) {
    createDepartment(input: $input)
  }
`

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($input: UpdateDepartmentInput!, $id: ID!) {
    updateDepartment(input: $input, id: $id)
  }
`

import gql from 'graphql-tag'

export const CREATE_DESIGNATION = gql`
  mutation CreateDesignation($input: CreateDesignationInput!) {
    createDesignation(input: $input)
  }
`

export const UPDATE_DESIGNATION = gql`
  mutation UpdateDesignation($input: UpdateDesignationInput!, $id: ID!) {
    updateDesignation(input: $input, id: $id)
  }
`
export const DELETE_DESIGNATION = gql`
  mutation DeleteDesignation($id: ID!) {
    deleteDesignation(id: $id)
  }
`

import gql from 'graphql-tag'

export const GENERATE_UPLOAD_POLICY = gql`
  mutation GenerateUploadPolicy($input: GenerateUploadPolicyInput!) {
    generateUploadPolicy(input: $input) {
      credentials {
        origin
        url
        params {
          acl
          algorithm
          credential
          date
          key
          policy
          signature
          successActionStatus
        }
      }
    }
  }
`

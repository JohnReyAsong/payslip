import MEMBER_FIELDS from '../fields/member'

export default `
  fragment MemberFragment on Member {
    ${MEMBER_FIELDS}
  }
`

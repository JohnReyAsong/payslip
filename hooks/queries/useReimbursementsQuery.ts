import { useQuery } from '@apollo/client'
import { REIMBURSEMENTS } from '@graphql/queries/reimbursements'
import { isBrowser } from '@utils/envUtils'
import { ReimbursementConnection } from 'types'

const useReimbursementsQuery = () => {
  const { data, refetch, loading } = useQuery<{ reimbursements: ReimbursementConnection }>(REIMBURSEMENTS, {
    skip: !isBrowser,
  })
  return {
    reimbursements: data?.reimbursements,
    refetchReimbursements: refetch,
    loadingReimbursements: loading,
  }
}

export default useReimbursementsQuery

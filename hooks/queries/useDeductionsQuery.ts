import { useQuery } from '@apollo/client'
import { DEDUCTIONS } from '@graphql/queries/deductions'
import { isBrowser } from '@utils/envUtils'
import { DeductiontConnection } from 'types'

const useDeductionsQuery = () => {
  const { data, refetch, loading } = useQuery<{ deductions: DeductiontConnection }>(DEDUCTIONS, {
    skip: !isBrowser,
  })
  return {
    deductions: data?.deductions,
    refetchDeductions: refetch,
    loadingDeductions: loading,
  }
}

export default useDeductionsQuery

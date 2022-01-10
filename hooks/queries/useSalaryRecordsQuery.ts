import { useQuery } from '@apollo/client'
import { SALARY_RECORDS } from '@graphql/queries/salaryRecords'
import { isBrowser } from '@utils/envUtils'
import { SalaryRecordConnection } from 'types'

const useSalaryRecordsQuery = () => {
  const { data, refetch, loading } = useQuery<{ salaryRecords: SalaryRecordConnection }>(SALARY_RECORDS, {
    skip: !isBrowser,
    fetchPolicy: 'no-cache',
  })

  return {
    salaryRecords: data?.salaryRecords,
    refetchSalaryRecords: refetch,
    loadingSalaryRecords: loading,
  }
}

export default useSalaryRecordsQuery

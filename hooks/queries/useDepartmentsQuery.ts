import { useQuery } from '@apollo/client'
import { DEPARTMENTS } from '@graphql/queries/departments'
import { isBrowser } from '@utils/envUtils'
import { DepartmentConnection } from 'types'

const useDepartmentsQuery = () => {
  const { data, refetch, loading } = useQuery<{ departments: DepartmentConnection }>(DEPARTMENTS, {
    skip: !isBrowser,
  })
  return {
    departments: data?.departments,
    refetchDepartments: refetch,
    loadingDepartments: loading,
  }
}

export default useDepartmentsQuery

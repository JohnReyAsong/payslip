import { useQuery } from '@apollo/client'
import { DESIGNATIONS } from '@graphql/queries/designation'
import { isBrowser } from '@utils/envUtils'
import { DesignationtConnection } from 'types'

const useDesignationsQuery = () => {
  const { data, refetch, loading } = useQuery<{ designations: DesignationtConnection }>(DESIGNATIONS, {
    skip: !isBrowser,
  })
  return {
    designations: data?.designations,
    refetchDesignations: refetch,
    loadingDesignations: loading,
  }
}

export default useDesignationsQuery

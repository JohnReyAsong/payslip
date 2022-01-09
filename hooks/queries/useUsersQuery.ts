import { useQuery } from '@apollo/client'
import { USERS } from '@graphql/queries/users'
import { isBrowser } from '@utils/envUtils'
import { UserConnection } from 'types'

const useUsersQuery = () => {
  const { data, refetch, loading } = useQuery<{ users: UserConnection }>(USERS, {
    skip: !isBrowser,
  })
  return {
    users: data?.users,
    refetchUsers: refetch,
    loadingUsers: loading,
  }
}

export default useUsersQuery

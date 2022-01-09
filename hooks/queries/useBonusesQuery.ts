import { useQuery } from '@apollo/client'
import { BONUSES } from '@graphql/queries/bonuses'
import { isBrowser } from '@utils/envUtils'
import { BonusConnection } from 'types'

const useBonusesQuery = () => {
  const { data, refetch, loading } = useQuery<{ bonuses: BonusConnection }>(BONUSES, {
    skip: !isBrowser,
  })
  return {
    bonuses: data?.bonuses,
    refetchBonuses: refetch,
    loadingBonuses: loading,
  }
}

export default useBonusesQuery

import { CREATE_BONUS, UPDATE_BONUS } from '@graphql/mutations/bonus'
import useGraphqlHooks from '@hooks/useGraphqlHooks'
import { MutationCreateBonusArgs, MutationUpdateBonusArgs } from 'types'

const useBonusMutation = () => {
  const { useMutation } = useGraphqlHooks()

  const [createBonus] = useMutation<{ createBonus: string }, MutationCreateBonusArgs>(CREATE_BONUS)
  const [updateBonus] = useMutation<{ updateBonus: string }, MutationCreateBonusArgs>(UPDATE_BONUS)

  const createBonusAction = async (variables: MutationCreateBonusArgs) => {
    return createBonus({
      variables,
    })
  }

  const updateBonusAction = async (variables: MutationUpdateBonusArgs) => {
    return updateBonus({
      variables,
    })
  }

  return { createBonusAction, updateBonusAction }
}

export default useBonusMutation

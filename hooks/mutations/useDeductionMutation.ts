import { CREATE_DEDUCTION, UPDATE_DEDUCTION } from '@graphql/mutations/deduction'
import useGraphqlHooks from '@hooks/useGraphqlHooks'
import { MutationCreateDeductionArgs, MutationUpdateDeductionArgs } from 'types'

const useDeductionMutation = () => {
  const { useMutation } = useGraphqlHooks()

  const [createDeduction] = useMutation<{ createDeduction: string }, MutationCreateDeductionArgs>(CREATE_DEDUCTION)
  const [updateDeduction] = useMutation<{ updateDeduction: string }, MutationCreateDeductionArgs>(UPDATE_DEDUCTION)

  const createDeductionAction = async (variables: MutationCreateDeductionArgs) => {
    return createDeduction({
      variables,
    })
  }

  const updateDeductionAction = async (variables: MutationUpdateDeductionArgs) => {
    return updateDeduction({
      variables,
    })
  }

  return { createDeductionAction, updateDeductionAction }
}

export default useDeductionMutation

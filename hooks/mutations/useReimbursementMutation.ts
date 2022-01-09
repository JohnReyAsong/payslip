import { CREATE_REIMBURSEMENT, UPDATE_REIMBURSEMENT } from '@graphql/mutations/reimbursement'
import useGraphqlHooks from '@hooks/useGraphqlHooks'
import { MutationCreateReimbursementArgs, MutationUpdateReimbursementArgs } from 'types'

const useReimbursementMutation = () => {
  const { useMutation } = useGraphqlHooks()

  const [createReimbursement] = useMutation<{ createReimbursement: string }, MutationCreateReimbursementArgs>(
    CREATE_REIMBURSEMENT
  )
  const [updateReimbursement] = useMutation<{ updateReimbursement: string }, MutationCreateReimbursementArgs>(
    UPDATE_REIMBURSEMENT
  )

  const createReimbursementAction = async (variables: MutationCreateReimbursementArgs) => {
    return createReimbursement({
      variables,
    })
  }

  const updateReimbursementAction = async (variables: MutationUpdateReimbursementArgs) => {
    return updateReimbursement({
      variables,
    })
  }

  return { createReimbursementAction, updateReimbursementAction }
}

export default useReimbursementMutation

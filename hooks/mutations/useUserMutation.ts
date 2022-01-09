import { CREATE_USER, UPDATE_USER } from '@graphql/mutations/user'
import useGraphqlHooks from '@hooks/useGraphqlHooks'
import { MutationCreateUserArgs, MutationUpdateUserArgs } from 'types'

const useUserMutation = () => {
  const { useMutation } = useGraphqlHooks()

  const [createUser] = useMutation<{ createUser: string }, MutationCreateUserArgs>(CREATE_USER)
  const [updateUser] = useMutation<{ updateUser: string }, MutationUpdateUserArgs>(UPDATE_USER)

  const createUserAction = async (variables: MutationCreateUserArgs) => {
    return createUser({
      variables,
    })
  }

  const updateUserAction = async (variables: MutationUpdateUserArgs) => {
    return updateUser({
      variables,
    })
  }

  return { createUserAction, updateUserAction }
}

export default useUserMutation

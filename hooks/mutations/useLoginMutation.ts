import { LOGIN } from '@graphql/mutations/login'
import useGraphqlHooks from '@hooks/useGraphqlHooks'
import { AuthenticateResponse, MutationAuthenticateArgs } from 'types'

const useLoginMutation = () => {
  const { useMutation } = useGraphqlHooks()

  const [login] = useMutation<{ authenticate: AuthenticateResponse }, MutationAuthenticateArgs>(LOGIN)

  const loginAction = async (variables: MutationAuthenticateArgs) => {
    return login({
      variables,
    })
  }

  return { loginAction }
}

export default useLoginMutation

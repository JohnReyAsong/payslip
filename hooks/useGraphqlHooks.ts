import { DocumentNode, useMutation as useGraphqlMutation } from '@apollo/client'

const useGraphqlHooks = () => {
  const useMutation = <X, Y>(documentNode: DocumentNode) => useGraphqlMutation<X, Y>(documentNode, { onError: () => { } })
  return { useMutation }
}

export default useGraphqlHooks
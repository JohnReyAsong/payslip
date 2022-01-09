import { CREATE_DESIGNATION, UPDATE_DESIGNATION, DELETE_DESIGNATION } from '@graphql/mutations/designation'
import useGraphqlHooks from '@hooks/useGraphqlHooks'
import { MutationCreateDesignationArgs, MutationDeleteDesignationArgs, MutationUpdateDesignationArgs } from 'types'

const useDesignationMutation = () => {
  const { useMutation } = useGraphqlHooks()

  const [createDesignation] = useMutation<{ createDesignation: string }, MutationCreateDesignationArgs>(
    CREATE_DESIGNATION
  )
  const [updateDesignation] = useMutation<{ updateDesignation: string }, MutationUpdateDesignationArgs>(
    UPDATE_DESIGNATION
  )
  const [deleteDesignation] = useMutation<{ deleteDesignation: string }, MutationDeleteDesignationArgs>(
    DELETE_DESIGNATION
  )

  const createDesignationAction = async (variables: MutationCreateDesignationArgs) => {
    return createDesignation({
      variables,
    })
  }

  const updateDesignationAction = async (variables: MutationUpdateDesignationArgs) => {
    return updateDesignation({
      variables,
    })
  }

  const deleteDesignationAction = async (variables: MutationDeleteDesignationArgs) => {
    return deleteDesignation({
      variables,
    })
  }

  return { createDesignationAction, updateDesignationAction, deleteDesignationAction }
}

export default useDesignationMutation

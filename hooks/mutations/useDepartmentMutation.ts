import { CREATE_DEPARTMENT, UPDATE_DEPARTMENT } from '@graphql/mutations/department'
import useGraphqlHooks from '@hooks/useGraphqlHooks'
import { MutationCreateDepartmentArgs, MutationUpdateDepartmentArgs } from 'types'

const useDepartmentMutation = () => {
  const { useMutation } = useGraphqlHooks()

  const [createDepartment] = useMutation<{ createDepartment: string }, MutationCreateDepartmentArgs>(CREATE_DEPARTMENT)
  const [updateDepartment] = useMutation<{ updateDepartment: string }, MutationCreateDepartmentArgs>(UPDATE_DEPARTMENT)

  const createDepartmentAction = async (variables: MutationCreateDepartmentArgs) => {
    return createDepartment({
      variables,
    })
  }

  const updateDepartmentAction = async (variables: MutationUpdateDepartmentArgs) => {
    return updateDepartment({
      variables,
    })
  }

  return { createDepartmentAction, updateDepartmentAction }
}

export default useDepartmentMutation

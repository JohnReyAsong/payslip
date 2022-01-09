import { CREATE_SALARY_RECORD, UPDATE_SALARY_RECORD, DELETE_SALARY_RECORD } from '@graphql/mutations/salaryRecord'
import useGraphqlHooks from '@hooks/useGraphqlHooks'
import { MutationCreateSalaryRecordArgs, MutationDeleteSalaryRecordArgs, MutationUpdateSalaryRecordArgs } from 'types'

const useSalaryRecordMutation = () => {
  const { useMutation } = useGraphqlHooks()

  const [createSalaryRecord] = useMutation<{ createSalaryRecord: string }, MutationCreateSalaryRecordArgs>(
    CREATE_SALARY_RECORD
  )
  const [updateSalaryRecord] = useMutation<{ updateSalaryRecord: string }, MutationUpdateSalaryRecordArgs>(
    UPDATE_SALARY_RECORD
  )
  const [deleteSalaryRecord] = useMutation<{ deleteSalaryRecord: string }, MutationDeleteSalaryRecordArgs>(
    DELETE_SALARY_RECORD
  )

  const createSalaryRecordAction = async (variables: MutationCreateSalaryRecordArgs) => {
    return createSalaryRecord({
      variables,
    })
  }

  const updateSalaryRecordAction = async (variables: MutationUpdateSalaryRecordArgs) => {
    return updateSalaryRecord({
      variables,
    })
  }

  const deleteSalaryRecordAction = async (variables: MutationDeleteSalaryRecordArgs) => {
    return deleteSalaryRecord({
      variables,
    })
  }

  return { createSalaryRecordAction, updateSalaryRecordAction, deleteSalaryRecordAction }
}

export default useSalaryRecordMutation

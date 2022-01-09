import { FC, useEffect } from 'react'
import { FormControl, FormLabel, Input, Flex, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import useDeductionMutation from '@hooks/mutations/useDeductionMutation'
import { showToast } from '@utils/toastUtils'
import { useDeductionsQuery } from '@hooks/queries'
import { Deduction } from '../Deduction'

interface ManageDeductionFormProps {
  onClose(): void
  selectedDeduction?: Deduction
  isCreate: boolean
}

const ManageDeductionForm: FC<ManageDeductionFormProps> = ({ onClose, selectedDeduction, isCreate }) => {
  const { handleSubmit, register, formState, reset } = useForm()
  const { createDeductionAction, updateDeductionAction } = useDeductionMutation()
  const { refetchDeductions } = useDeductionsQuery()
  const { isSubmitting } = formState

  const onSubmit = async (value: Deduction) => {
    if (isCreate) {
      const { data } = await createDeductionAction({
        input: {
          name: value.name,
        },
      })
      if (data?.createDeduction) {
        showToast('Created successfully!', 'success')
        onClose()
        refetchDeductions()
      }
    } else {
      const { data } = await updateDeductionAction({
        id: value.id,
        input: {
          name: value.name,
        },
      })
      if (data?.updateDeduction) {
        showToast('Updated successfully!', 'success')
        onClose()
        refetchDeductions()
      }
    }
  }

  useEffect(() => {
    if (selectedDeduction) {
      reset({
        id: selectedDeduction.id,
        name: selectedDeduction.name,
      })
    }
  }, [selectedDeduction, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel size="xs" color="gray.700">
          Name
        </FormLabel>
        <Input id="email" type="text" size="sm" {...register('name')} />
      </FormControl>

      <Flex mt="6" justifyContent="end">
        <Button variant="outline" mr="4" onClick={onClose}>
          Cancel
        </Button>
        <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
          Save Changes
        </Button>
      </Flex>
    </form>
  )
}

export default ManageDeductionForm

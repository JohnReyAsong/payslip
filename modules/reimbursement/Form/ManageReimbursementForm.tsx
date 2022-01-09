import { FC, useEffect } from 'react'
import { FormControl, FormLabel, Input, Flex, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import useReimbursementMutation from '@hooks/mutations/useReimbursementMutation'
import { showToast } from '@utils/toastUtils'
import { useReimbursementsQuery } from '@hooks/queries'
import { Reimbursement } from '../Reimbursement'

interface ManageReimbursementFormProps {
  onClose(): void
  selectedReimbursement?: Reimbursement
  isCreate: boolean
}

const ManageReimbursementForm: FC<ManageReimbursementFormProps> = ({ onClose, selectedReimbursement, isCreate }) => {
  const { handleSubmit, register, formState, reset } = useForm()
  const { createReimbursementAction, updateReimbursementAction } = useReimbursementMutation()
  const { refetchReimbursements } = useReimbursementsQuery()
  const { isSubmitting } = formState

  const onSubmit = async (value: Reimbursement) => {
    if (isCreate) {
      const { data } = await createReimbursementAction({
        input: {
          name: value.name,
        },
      })
      if (data?.createReimbursement) {
        showToast('Created successfully!', 'success')
        onClose()
        refetchReimbursements()
      }
    } else {
      const { data } = await updateReimbursementAction({
        id: value.id,
        input: {
          name: value.name,
        },
      })
      if (data?.updateReimbursement) {
        showToast('Created successfully!', 'success')
        onClose()
        refetchReimbursements()
      }
    }
  }

  useEffect(() => {
    if (selectedReimbursement) {
      reset({
        id: selectedReimbursement.id,
        name: selectedReimbursement.name,
      })
    }
  }, [selectedReimbursement, reset])

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

export default ManageReimbursementForm

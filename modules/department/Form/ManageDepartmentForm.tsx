import { FC, useEffect } from 'react'
import { FormControl, FormLabel, Input, Flex, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import useDepartmentMutation from '@hooks/mutations/useDepartmentMutation'
import { showToast } from '@utils/toastUtils'
import { useDepartmentsQuery } from '@hooks/queries'
import { Department } from '../Department'

interface ManageDepartmentFormProps {
  onClose(): void
  selectedDepartment?: Department
  isCreate: boolean
}

const ManageDepartmentForm: FC<ManageDepartmentFormProps> = ({ onClose, selectedDepartment, isCreate }) => {
  const { handleSubmit, register, formState, reset } = useForm()
  const { createDepartmentAction, updateDepartmentAction } = useDepartmentMutation()
  const { refetchDepartments } = useDepartmentsQuery()
  const { isSubmitting } = formState

  const onSubmit = async (value: Department) => {
    if (isCreate) {
      const { data } = await createDepartmentAction({
        input: {
          name: value.name,
        },
      })
      if (data?.createDepartment) {
        showToast('Created successfully!', 'success')
        onClose()
        refetchDepartments()
      }
    } else {
      const { data } = await updateDepartmentAction({
        id: value.id,
        input: {
          name: value.name,
        },
      })
      if (data?.updateDepartment) {
        showToast('Updated successfully!', 'success')
        onClose()
        refetchDepartments()
      }
    }
  }

  useEffect(() => {
    if (selectedDepartment) {
      reset({
        id: selectedDepartment.id,
        name: selectedDepartment.name,
      })
    }
  }, [selectedDepartment, reset])

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

export default ManageDepartmentForm

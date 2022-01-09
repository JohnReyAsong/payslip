import { FC, useEffect } from 'react'
import { FormControl, FormLabel, Input, Flex, Button, Select } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import useDesignationMutation from '@hooks/mutations/useDesignationMutation'
import { showToast } from '@utils/toastUtils'
import { useDesignationsQuery, useDepartmentsQuery } from '@hooks/queries'
import { Designation } from 'types'

interface ManageDesignationFormProps {
  onClose(): void
  selectedDesignation?: Omit<Designation, 'createdAt'>
  isCreate: boolean
}

const ManageDesignationForm: FC<ManageDesignationFormProps> = ({ onClose, selectedDesignation, isCreate }) => {
  const { handleSubmit, register, formState, reset } = useForm()
  const { createDesignationAction, updateDesignationAction } = useDesignationMutation()
  const { refetchDesignations } = useDesignationsQuery()
  const { departments } = useDepartmentsQuery()

  const { isSubmitting } = formState

  const onSubmit = async (value: Designation) => {
    if (isCreate) {
      const { data } = await createDesignationAction({
        input: {
          department: value.department.id,
          name: value.name,
        },
      })
      if (data?.createDesignation) {
        showToast('Created successfully!', 'success')
        onClose()
        refetchDesignations()
      }
    } else {
      const { data } = await updateDesignationAction({
        id: value.id,
        input: {
          department: value.department.id,
          name: value.name,
        },
      })
      if (data?.updateDesignation) {
        showToast('Updated successfully!', 'success')
        onClose()
        refetchDesignations()
      }
    }
  }

  useEffect(() => {
    if (selectedDesignation) {
      reset({
        id: selectedDesignation.id,
        department: {
          id: selectedDesignation.department.id,
          name: selectedDesignation.department.name,
        },
        name: selectedDesignation.name,
      })
    }
  }, [selectedDesignation, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired>
        <FormLabel size="xs" color="gray.700">
          Department
        </FormLabel>
        <Select id="email" type="text" size="sm" {...register('department.id')}>
          {departments?.edges.map((department) => (
            <>
              <option value={department?.id}>{department?.name}</option>
            </>
          ))}
        </Select>
      </FormControl>

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

export default ManageDesignationForm

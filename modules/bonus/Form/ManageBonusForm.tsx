import { FC, useEffect } from 'react'
import { FormControl, FormLabel, Input, Flex, Button } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import useBonusMutation from '@hooks/mutations/useBonusMutation'
import { showToast } from '@utils/toastUtils'
import { useBonusesQuery } from '@hooks/queries'
import { Bonus } from '../Bonus'

interface ManageBonusFormProps {
  onClose(): void
  selectedBonus?: Bonus
  isCreate: boolean
}

const ManageBonusForm: FC<ManageBonusFormProps> = ({ onClose, selectedBonus, isCreate }) => {
  const { handleSubmit, register, formState, reset } = useForm()
  const { createBonusAction, updateBonusAction } = useBonusMutation()
  const { refetchBonuses } = useBonusesQuery()
  const { isSubmitting } = formState

  const onSubmit = async (value: Bonus) => {
    if (isCreate) {
      const { data } = await createBonusAction({
        input: {
          name: value.name,
        },
      })
      if (data?.createBonus) {
        showToast('Created successfully!', 'success')
        onClose()
        refetchBonuses()
      }
    } else {
      const { data } = await updateBonusAction({
        id: value.id,
        input: {
          name: value.name,
        },
      })
      if (data?.updateBonus) {
        showToast('Updated successfully!', 'success')
        onClose()
        refetchBonuses()
      }
    }
  }

  useEffect(() => {
    if (selectedBonus) {
      reset({
        id: selectedBonus.id,
        name: selectedBonus.name,
      })
    }
  }, [selectedBonus, reset])

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

export default ManageBonusForm

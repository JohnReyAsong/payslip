import { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'

import HovModal from '@components/HovModal'
import ManageBonusForm from '../Form/ManageBonusForm'
import { Bonus } from '../Bonus'

interface ManageBonusModalProps {
  isOpen: boolean
  onClose(): void
  selectedBonus?: Bonus
}

const ManageBonusModal: FC<ManageBonusModalProps> = ({ isOpen, onClose, selectedBonus }) => {
  const isCreate = Boolean(!selectedBonus?.name)
  return (
    <HovModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <Flex>
          <Text color="gray.600" fontSize="xl" fontWeight="bold">
            {isCreate ? 'Create' : 'Edit'} Bonus
          </Text>
        </Flex>
      }
      size={'md'}
    >
      <ManageBonusForm onClose={onClose} selectedBonus={selectedBonus} isCreate={isCreate} />
    </HovModal>
  )
}

export default ManageBonusModal

import { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'

import HovModal from '@components/HovModal'
import ManageDesignationForm from '../Form/ManageDesignationForm'
import { Designation } from 'types'

interface ManageBonusModalProps {
  isOpen: boolean
  onClose(): void
  selectedDesignation?: Omit<Designation, 'createdAt'>
}

const ManageBonusModal: FC<ManageBonusModalProps> = ({ isOpen, onClose, selectedDesignation }) => {
  const isCreate = Boolean(!selectedDesignation?.name)
  return (
    <HovModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <Flex>
          <Text color="gray.600" fontSize="xl" fontWeight="bold">
            {isCreate ? 'Create' : 'Edit'} Designation
          </Text>
        </Flex>
      }
      size={'md'}
    >
      <ManageDesignationForm onClose={onClose} selectedDesignation={selectedDesignation} isCreate={isCreate} />
    </HovModal>
  )
}

export default ManageBonusModal

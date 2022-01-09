import { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'

import HovModal from '@components/HovModal'
import ManageDeductionForm from '../Form/ManageDeductionForm'
import { Deduction } from '../Deduction'

interface ManageBonusModalProps {
  isOpen: boolean
  onClose(): void
  selectedDeduction?: Deduction
}

const ManageBonusModal: FC<ManageBonusModalProps> = ({ isOpen, onClose, selectedDeduction }) => {
  const isCreate = Boolean(!selectedDeduction?.name)
  return (
    <HovModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <Flex>
          <Text color="gray.600" fontSize="xl" fontWeight="bold">
            {isCreate ? 'Create' : 'Edit'} Deduction
          </Text>
        </Flex>
      }
      size={'md'}
    >
      <ManageDeductionForm onClose={onClose} selectedDeduction={selectedDeduction} isCreate={isCreate} />
    </HovModal>
  )
}

export default ManageBonusModal

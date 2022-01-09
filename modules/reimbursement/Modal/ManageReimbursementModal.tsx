import { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'

import HovModal from '@components/HovModal'
import ManageReimbursementForm from '../Form/ManageReimbursementForm'
import { Reimbursement } from '../Reimbursement'

interface ManageReimbursementModalProps {
  isOpen: boolean
  onClose(): void
  selectedReimbursement?: Reimbursement
}

const ManageReimbursementModal: FC<ManageReimbursementModalProps> = ({ isOpen, onClose, selectedReimbursement }) => {
  const isCreate = Boolean(!selectedReimbursement?.name)
  return (
    <HovModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <Flex>
          <Text color="gray.600" fontSize="xl" fontWeight="bold">
            {isCreate ? 'Create' : 'Edit'} Reimbursement
          </Text>
        </Flex>
      }
      size={'md'}
    >
      <ManageReimbursementForm onClose={onClose} selectedReimbursement={selectedReimbursement} isCreate={isCreate} />
    </HovModal>
  )
}

export default ManageReimbursementModal

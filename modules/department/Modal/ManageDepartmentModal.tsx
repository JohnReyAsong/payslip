import { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'

import HovModal from '@components/HovModal'
import ManageDepartmentForm from '../Form/ManageDepartmentForm'
import { Department } from '../Department'

interface ManageDepartmentModalProps {
  isOpen: boolean
  onClose(): void
  selectedDepartment?: Department
}

const ManageDepartmentModal: FC<ManageDepartmentModalProps> = ({ isOpen, onClose, selectedDepartment }) => {
  const isCreate = Boolean(!selectedDepartment?.name)
  return (
    <HovModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <Flex>
          <Text color="gray.600" fontSize="xl" fontWeight="bold">
            {isCreate ? 'Create' : 'Edit'} Department
          </Text>
        </Flex>
      }
      size={'md'}
    >
      <ManageDepartmentForm onClose={onClose} selectedDepartment={selectedDepartment} isCreate={isCreate} />
    </HovModal>
  )
}

export default ManageDepartmentModal

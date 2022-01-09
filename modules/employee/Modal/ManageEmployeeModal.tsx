import { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import HovModal from '@components/HovModal'
import ManageEmployeeForm from '../Form/ManageEmployeeForm'
import { CustomUser } from '../Employee'

interface ManageEmployeeModalProps {
  isOpen: boolean
  onClose(): void
  selectedEmployee?: CustomUser
}

const ManageEmployeeModal: FC<ManageEmployeeModalProps> = ({ isOpen, onClose, selectedEmployee }) => {
  const isCreate = Boolean(!selectedEmployee?.id)

  return (
    <HovModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <Flex>
          <Text color="gray.600" fontSize="xl" fontWeight="bold">
            {isCreate ? 'Create' : 'Edit'} Employee
          </Text>
        </Flex>
      }
      size={'lg'}
    >
      <ManageEmployeeForm onClose={onClose} selectedEmployee={selectedEmployee} isCreate={isCreate} />
    </HovModal>
  )
}

export default ManageEmployeeModal

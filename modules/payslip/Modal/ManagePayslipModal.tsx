import { FC } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import HovModal from '@components/HovModal'
import ManagePayslipForm from '../Form/ManagePayslipForm'
import { SalaryRecord } from 'types'

interface ManagePayslipModalProps {
  isOpen: boolean
  onClose(): void
  selectedSalaryRecord?: SalaryRecord
}

const ManagePayslipModal: FC<ManagePayslipModalProps> = ({ isOpen, onClose, selectedSalaryRecord }) => {
  const isCreate = Boolean(!selectedSalaryRecord?.id)

  return (
    <HovModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <Flex>
          <Text color="gray.600" fontSize="xl" fontWeight="bold">
            {isCreate ? 'Create' : 'Edit'} Payslip
          </Text>
        </Flex>
      }
      size={'xl'}
    >
      <ManagePayslipForm onClose={onClose} selectedSalaryRecord={selectedSalaryRecord} isCreate={isCreate} />
    </HovModal>
  )
}

export default ManagePayslipModal

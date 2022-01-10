import { FC, useState } from 'react'
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
} from '@chakra-ui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import moment from 'moment'

import ManagePayslipModal from './Modal/ManagePayslipModal'
import { useSalaryRecordsQuery } from '@hooks/queries'
import { UserRole } from 'types'
import HovAlertDialog from '@components/HovAlertDialog'
import { useSalaryRecordMutation } from '@hooks/mutations'
import { showToast } from '@utils/toastUtils'

const Payslip: FC = () => {
  const { isOpen: isOpenManage, onOpen: onOpenManage, onClose: onCloseManage } = useDisclosure()
  const { salaryRecords, refetchSalaryRecords } = useSalaryRecordsQuery()

  const [selectedSalaryRecord, setSelectedSalaryRecord] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)

  const deleteSalaryRecord = useDisclosure()
  const { deleteSalaryRecordAction } = useSalaryRecordMutation()

  const onDeletePayslip = async () => {
    setIsLoading(true)
    const { data } = await deleteSalaryRecordAction({
      id: selectedSalaryRecord.id,
    })
    if (data?.deleteSalaryRecord) {
      await refetchSalaryRecords()
      setIsLoading(false)
      showToast(`Payslip deleted `, 'success')
      deleteSalaryRecord.onClose()
    }
  }

  return (
    <>
      <ManagePayslipModal
        selectedSalaryRecord={selectedSalaryRecord}
        isOpen={isOpenManage}
        onClose={() => {
          onCloseManage()
          setSelectedSalaryRecord({
            id: '',
            employee: {
              id: '',
              firstname: '',
              lastname: '',
              address: '',
              designation: '',
              emailAddress: '',
              role: UserRole.Member,
              department: '',
              baseSalary: 0,
              accountNumber: '',
              bankName: '',
            },
            payPeriod: {
              startDate: '',
              endDate: '',
            },
            payrollDate: '',
            netPay: 0,
            grossPay: 0,
            depositeDate: '',
            bonus: [
              {
                id: '',
                amount: 0,
              },
            ],
            deductions: [
              {
                id: '',
                amount: 0,
              },
            ],
            reimbursements: [
              {
                id: '',
                amount: 0,
              },
            ],
          })
        }}
      />
      <Flex justifyContent="end">
        <Button mb={4} ml={2} colorScheme="blue" px={8} onClick={onOpenManage}>
          Create Payslip
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Employee</Th>
            <Th>Payroll Date</Th>
            <Th>Payroll Period</Th>
            <Th>Net Income</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {salaryRecords?.edges.map((salaryRecord) => (
            <Tr key={salaryRecord?.id}>
              <Td>
                {salaryRecord?.employee.firstname}&nbsp;{salaryRecord?.employee.lastname}
              </Td>
              <Td>{moment(salaryRecord?.payrollDate).format('MMM DD, YYYY')}</Td>
              <Td>
                {moment(salaryRecord?.payPeriod.startDate).format('MMM DD, YYYY')} -{' '}
                {moment(salaryRecord?.payPeriod.endDate).format('MMM DD, YYYY')}
              </Td>
              <Td>{salaryRecord?.netPay}</Td>
              <Th isNumeric>
                <Menu>
                  <MenuButton cursor="pointer">
                    <Icon as={DotsHorizontalIcon} boxSize={6} />
                  </MenuButton>
                  <MenuList fontSize="sm" minWidth="84px" boxShadow="lg" p={0}>
                    <MenuItem
                      p={3}
                      onClick={() => {
                        onOpenManage()
                        setSelectedSalaryRecord({
                          id: salaryRecord?.id,
                          employee: salaryRecord?.employee,
                          payPeriod: salaryRecord?.payPeriod,
                          payrollDate: moment(salaryRecord?.depositDate).format('YYYY-MM-DD'),
                          netPay: salaryRecord?.netPay || 0,
                          grossPay: salaryRecord?.grossPay || 0,
                          depositDate: moment(salaryRecord?.depositDate).format('YYYY-MM-DD'),
                          bonus: salaryRecord?.bonus,
                          deductions: salaryRecord?.deductions,
                          reimbursements: salaryRecord?.reimbursements,
                        })
                      }}
                    >
                      Edit
                    </MenuItem>

                    <MenuDivider my={0} />

                    <MenuItem
                      p={3}
                      onClick={() => {
                        setSelectedSalaryRecord({
                          id: salaryRecord?.id,
                          employee: salaryRecord?.employee,
                          payPeriod: salaryRecord?.payPeriod,
                          payrollDate: moment(salaryRecord?.depositDate).format('YYYY-MM-DD'),
                          netPay: salaryRecord?.netPay || 0,
                          grossPay: salaryRecord?.grossPay || 0,
                          depositDate: moment(salaryRecord?.depositDate).format('YYYY-MM-DD'),
                          bonus: salaryRecord?.bonus,
                          deductions: salaryRecord?.deductions,
                          reimbursements: salaryRecord?.reimbursements,
                        })
                        deleteSalaryRecord.onOpen()
                      }}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HovAlertDialog
        title="Delete Payslip"
        description="Are you sure? You can't undo this action afterwards."
        type="warning"
        disclosure={deleteSalaryRecord}
        okText="Delete"
        okBtnProps={{
          onClick: onDeletePayslip,
          isLoading: isLoading,
        }}
        cancelText="Cancel"
      />
    </>
  )
}

export default Payslip

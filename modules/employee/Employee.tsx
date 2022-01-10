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

import ManageEmployeeModal from './Modal/ManageEmployeeModal'
import { useUsersQuery } from '@hooks/queries'
import { User, UserRole } from 'types'

export interface CustomUser extends Omit<User, 'createdAt'> {
  password: string
}

const EmployeeModule: FC = () => {
  const { isOpen: isOpenManage, onOpen: onOpenManage, onClose: onCloseManage } = useDisclosure()
  const { users } = useUsersQuery()
  const [selectedEmployee, setSelectedEmployee] = useState<CustomUser>()

  return (
    <>
      <ManageEmployeeModal
        selectedEmployee={selectedEmployee}
        isOpen={isOpenManage}
        onClose={() => {
          onCloseManage()
          setSelectedEmployee({
            id: '',
            firstname: '',
            lastname: '',
            address: '',
            designation: '',
            emailAddress: '',
            password: '',
            role: UserRole.Member,
            department: '',
            baseSalary: 0,
            accountNumber: '',
            bankName: '',
          })
        }}
      />
      <Flex justifyContent="end">
        <Button mb={4} colorScheme="blue" onClick={onOpenManage}>
          Create Employee
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Department</Th>
            <Th>Base Salary</Th>
            <Th>Bank Name</Th>
            <Th>Account Number</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {((users?.edges as unknown as CustomUser[]) || []).map((user) => (
            <Tr key={user?.id}>
              <Td>{user?.firstname}</Td>
              <Td>{user?.lastname}</Td>
              <Td>{user?.department}</Td>
              <Td>{user?.baseSalary}</Td>
              <Td>{user?.bankName}</Td>
              <Td>{user?.accountNumber}</Td>
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
                        setSelectedEmployee({
                          id: user?.id || '',
                          firstname: user?.firstname || '',
                          lastname: user?.lastname || '',
                          address: user?.address || '',
                          designation: user?.designation || '',
                          emailAddress: user?.emailAddress || '',
                          password: user?.password || '',
                          role: user?.role || UserRole.Member,
                          department: user?.department || '',
                          baseSalary: user?.baseSalary || 0,
                          accountNumber: user?.accountNumber || '',
                          bankName: user?.bankName || '',
                        })
                      }}
                    >
                      Edit
                    </MenuItem>

                    <MenuDivider my={0} />
                    <MenuItem p={3}>Delete</MenuItem>
                  </MenuList>
                </Menu>
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export default EmployeeModule

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

import ManageDepartmentModal from './Modal/ManageDepartmentModal'
import { useDepartmentsQuery } from '@hooks/queries'

export type Department = {
  id: string
  name: string
}

const DepartmentModule: FC = () => {
  const { isOpen: isOpenManage, onOpen: onOpenManage, onClose: onCloseManage } = useDisclosure()
  const { departments } = useDepartmentsQuery()
  const [selectedDepartment, setSelectedDepartment] = useState<Department>()

  return (
    <>
      <ManageDepartmentModal
        selectedDepartment={selectedDepartment}
        isOpen={isOpenManage}
        onClose={() => {
          onCloseManage()
          setSelectedDepartment({
            id: '',
            name: '',
          })
        }}
      />
      <Flex justifyContent="end">
        <Button mb={4} ml={2} colorScheme="blue" onClick={onOpenManage}>
          Create Department
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {departments?.edges.map((department) => (
            <Tr key={department?.id}>
              <Td>{department?.name}</Td>
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
                        setSelectedDepartment({
                          id: department?.id || '',
                          name: department?.name || '',
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

export default DepartmentModule

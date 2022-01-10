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
  useDisclosure,
} from '@chakra-ui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'

import ManageDesignationModal from './Modal/ManageDesignationModal'
import { useDesignationsQuery } from '@hooks/queries'
import { Designation } from 'types'

const DesignationModule: FC = () => {
  const { isOpen: isOpenManage, onOpen: onOpenManage, onClose: onCloseManage } = useDisclosure()
  const { designations } = useDesignationsQuery()
  const [selectedDesignation, setSelectedDesignation] = useState<Omit<Designation, 'createdAt'>>()

  return (
    <>
      <ManageDesignationModal
        isOpen={isOpenManage}
        selectedDesignation={selectedDesignation}
        onClose={() => {
          onCloseManage()
          setSelectedDesignation({
            id: '',
            name: '',
            department: {
              id: '',
              name: '',
              createdAt: '',
            },
          })
        }}
      />
      <Flex justifyContent="end">
        <Button mb={4} ml={2} colorScheme="blue" onClick={onOpenManage}>
          Create Designation
        </Button>
      </Flex>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Department</Th>
            <Th isNumeric>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {designations?.edges.map((designation) => (
            <Tr key={designation?.id}>
              <Td>{designation?.name}</Td>
              <Td>{designation?.department.name}</Td>

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
                        setSelectedDesignation({
                          id: designation?.id || '',
                          name: designation?.name || '',
                          department: {
                            id: designation?.department.id || '',
                            name: designation?.department.name || '',
                            createdAt: designation?.department.createdAt || '',
                          },
                        })
                      }}
                    >
                      Edit
                    </MenuItem>
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

export default DesignationModule

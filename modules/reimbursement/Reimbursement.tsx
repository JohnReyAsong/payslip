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

import ManageReimbursementModal from './Modal/ManageReimbursementModal'
import { useReimbursementsQuery } from '@hooks/queries'

export type Reimbursement = {
  id: string
  name: string
}

const ReimbursementModule: FC = () => {
  const { isOpen: isOpenManage, onOpen: onOpenManage, onClose: onCloseManage } = useDisclosure()
  const { reimbursements } = useReimbursementsQuery()
  const [selectedReimbursement, setSelectedReimbursement] = useState<Reimbursement>()

  return (
    <>
      <ManageReimbursementModal
        selectedReimbursement={selectedReimbursement}
        isOpen={isOpenManage}
        onClose={() => {
          onCloseManage()
          setSelectedReimbursement({
            id: '',
            name: '',
          })
        }}
      />
      <Flex justifyContent="end">
        <Button mb={4} ml={2} colorScheme="blue" onClick={onOpenManage}>
          Create Reimbursement
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
          {reimbursements?.edges.map((reimbursement) => (
            <Tr key={reimbursement?.id}>
              <Td>{reimbursement?.name}</Td>
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
                        setSelectedReimbursement({
                          id: reimbursement?.id || '',
                          name: reimbursement?.name || '',
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

export default ReimbursementModule

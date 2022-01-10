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

import ManageDeductionModal from './Modal/ManageDeductionModal'
import useDeductionsQuery from '@hooks/queries/useDeductionsQuery'

export type Deduction = {
  id: string
  name: string
}

const DeductionModule: FC = () => {
  const { isOpen: isOpenManage, onOpen: onOpenManage, onClose: onCloseManage } = useDisclosure()
  const { deductions } = useDeductionsQuery()
  const [selectedDeduction, setSelectedBonus] = useState<Deduction>()

  return (
    <>
      <ManageDeductionModal
        selectedDeduction={selectedDeduction}
        isOpen={isOpenManage}
        onClose={() => {
          onCloseManage()
          setSelectedBonus({
            id: '',
            name: '',
          })
        }}
      />
      <Flex justifyContent="end">
        <Button mb={4} ml={2} colorScheme="blue" onClick={onOpenManage}>
          Create Deduction
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
          {deductions?.edges.map((deduction) => (
            <Tr key={deduction?.id}>
              <Td>{deduction?.name}</Td>
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
                        setSelectedBonus({
                          id: deduction?.id || '',
                          name: deduction?.name || '',
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

export default DeductionModule

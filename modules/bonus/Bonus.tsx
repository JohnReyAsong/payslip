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

import ManageBonusModal from './Modal/ManageBonusModal'
import { useBonusesQuery } from '@hooks/queries'

export type Bonus = {
  id: string
  name: string
}

const BonusModule: FC = () => {
  const { isOpen: isOpenManage, onOpen: onOpenManage, onClose: onCloseManage } = useDisclosure()
  const { bonuses } = useBonusesQuery()
  const [selectedBonus, setSelectedBonus] = useState<Bonus>()

  return (
    <>
      <ManageBonusModal
        selectedBonus={selectedBonus}
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
          Create Bonus
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
          {bonuses?.edges.map((bonus) => (
            <Tr key={bonus?.id}>
              <Td>{bonus?.name}</Td>
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
                          id: bonus?.id || '',
                          name: bonus?.name || '',
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

export default BonusModule

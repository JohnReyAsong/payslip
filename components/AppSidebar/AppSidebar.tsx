import { FC } from 'react'
import { Avatar, Flex, Heading, VStack } from '@chakra-ui/react'
import {
  LogoutIcon,
  ReceiptTaxIcon,
  UserIcon,
  UserGroupIcon,
  CashIcon,
  ScissorsIcon,
  ClipboardCopyIcon,
} from '@heroicons/react/solid'
import Link from 'next/link'

import MenuItem from './MenuItem'
import { logout } from '@utils/authUtils'

interface AppSidebarProps {
  isCollapsed?: boolean
}

const AppSidebar: FC<AppSidebarProps> = ({ isCollapsed = false }) => {
  const stackSpacing = isCollapsed ? 4 : 1
  return (
    <Flex pos="fixed" w={isCollapsed ? 14 : 52} bg="#F9F9F9" h="100vh" flexDir="column" justifyContent="space-between">
      <Flex flexDir="column">
        <Flex
          p="24px 16px 16px"
          alignItems="center"
          {...(isCollapsed && { justifyContent: 'center' })}
          borderBottom="1px solid #E5E7EB"
        >
          <Link href={{ pathname: '/' }}>
            <Avatar
              src="/logo.png"
              name={process.env.appName}
              size="xs"
              bg="white"
              borderRadius="md"
              cursor="pointer"
            />
          </Link>
          {!isCollapsed && (
            <Heading ml="6px" as="h4" fontSize={12} mb={0}>
              {process.env.appName}
            </Heading>
          )}
        </Flex>
        <VStack px={2} mt={3} spacing={stackSpacing} alignItems="start">
          <MenuItem icon={ReceiptTaxIcon} label="Payslip" isCollapsed={isCollapsed} pathname="/" />

          <MenuItem icon={UserIcon} label="Employee" isCollapsed={isCollapsed} pathname="/employee" />
          <MenuItem icon={UserGroupIcon} label="Department" isCollapsed={isCollapsed} pathname="/department" />
          <MenuItem icon={UserGroupIcon} label="Designation" isCollapsed={isCollapsed} pathname="/designation" />
          <MenuItem icon={CashIcon} label="Earnings" isCollapsed={isCollapsed} pathname="/earning" />
          <MenuItem icon={ScissorsIcon} label="Deduction" isCollapsed={isCollapsed} pathname="/deduction" />
          <MenuItem
            icon={ClipboardCopyIcon}
            label="Reimbursement"
            isCollapsed={isCollapsed}
            pathname="/reimbursement"
          />
        </VStack>
      </Flex>
      <Flex px={2} pb={12} flexDir="column">
        <VStack spacing={1} alignItems="start">
          <MenuItem icon={LogoutIcon} label="Logout" isCollapsed={isCollapsed} onClick={logout} />
        </VStack>
      </Flex>
    </Flex>
  )
}

export default AppSidebar

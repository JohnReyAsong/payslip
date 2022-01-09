import { Box, Container, Flex, Heading, Icon, IconButton } from '@chakra-ui/react'
import AppSidebar from '@components/AppSidebar'
import MetaTags from '@components/MetaTags'
import { LogoutIcon } from '@heroicons/react/solid'
import { FC, useState } from 'react'

interface LayoutProps {
  title: string
}

const Layout: FC<LayoutProps> = ({ children, title }) => {
  const [isCollapsed, setIsCollpased] = useState(false)
  return (
    <Flex>
      <MetaTags title={title} />
      <AppSidebar isCollapsed={isCollapsed} />
      <Box w="full" pl={isCollapsed ? 14 : 52}>
        <Flex
          px={4}
          position="sticky"
          top="0"
          h="64px"
          alignItems="center"
          borderBottom="1px solid #E5E7EB"
          bg="white"
          zIndex={3}
        >
          <IconButton
            mr={4}
            transform="scaleX(-1)"
            {...(isCollapsed && {
              transform: 'scaleX(1)',
            })}
            color="gray.400"
            size="xs"
            variant="unstyled"
            aria-label="toggle collapse"
            icon={<Icon fontSize={16} as={LogoutIcon} />}
            onClick={() => setIsCollpased((v) => !v)}
          />
          <Heading as="h2" fontSize="xl" mb={0}>
            {title}
          </Heading>
        </Flex>
        <Container w="full" maxW="container.lg" mt={20}>
          {children}
        </Container>
      </Box>
    </Flex>
  )
}

export default Layout

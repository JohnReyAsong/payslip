import { FC, useRef, ComponentType } from 'react'
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
  UseDisclosureReturn,
  Button,
  Flex,
  Box,
  Text,
  Icon,
  ButtonProps,
  ColorProps,
} from '@chakra-ui/react'
import ExclamationCircleIcon from '@heroicons/react/outline/ExclamationCircleIcon'
import XCircleIcon from '@heroicons/react/outline/XCircleIcon'
import CheckCircleIcon from '@heroicons/react/outline/CheckCircleIcon'

interface HovAlertDialogProps {
  type: 'success' | 'warning' | 'error'
  title: string
  description: string
  loading?: boolean
  disclosure: UseDisclosureReturn
  cancelBtnProps?: ButtonProps
  okBtnProps?: ButtonProps
  cancelText?: string
  okText?: string
}

const ICON_MAPPING: Record<
  HovAlertDialogProps['type'],
  {
    icon: ComponentType
    iconColor: ColorProps['color']
    okBtnBgColor: ColorProps['color']
    okBtnColor: ColorProps['color']
  }
> = {
  error: {
    icon: XCircleIcon,
    iconColor: '#FF4D4F',
    okBtnBgColor: '#FFCF21',
    okBtnColor: 'currentcolor',
  },
  success: {
    icon: CheckCircleIcon,
    iconColor: '#38A169',
    okBtnBgColor: '#FFCF21',
    okBtnColor: 'currentcolor',
  },
  warning: {
    icon: ExclamationCircleIcon,
    iconColor: '#F6AD55',
    okBtnBgColor: '#FF4D4F',
    okBtnColor: 'white',
  },
}

const HovAlertDialog: FC<HovAlertDialogProps> = ({
  loading = false,
  disclosure,
  title,
  description,
  type,
  cancelText = 'Cancel',
  okText = 'Ok',
  cancelBtnProps,
  okBtnProps,
}) => {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const { icon, iconColor, okBtnColor, okBtnBgColor } = ICON_MAPPING[type]
  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={disclosure.isOpen}
      onClose={disclosure.onClose}
      closeOnEsc={!loading}
      closeOnOverlayClick={!loading}
    >
      <AlertDialogOverlay>
        <AlertDialogContent borderRadius="base" w="416px" margin={8}>
          <AlertDialogBody pt={8} px={8} pb={0}>
            <Flex>
              <Icon color={iconColor} fontSize="xl" as={icon} mr={4} />
              <Box>
                <Text mb={2} fontSize="lg" fontWeight="bold">
                  {title}
                </Text>
                <Text>{description}</Text>
              </Box>
            </Flex>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              variant="outline"
              ref={cancelRef}
              onClick={disclosure.onClose}
              isDisabled={loading}
              {...cancelBtnProps}
            >
              {cancelText}
            </Button>
            <Button bg={okBtnBgColor} color={okBtnColor} isLoading={loading} {...okBtnProps} ml={3}>
              {okText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default HovAlertDialog

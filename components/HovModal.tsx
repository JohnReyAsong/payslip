import { FC, PropsWithChildren, ReactNode } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalProps,
  ModalHeaderProps,
  ModalContentProps,
  ModalBodyProps,
  ModalFooterProps,
  ModalOverlayProps,
} from '@chakra-ui/react'

interface HovModalProps extends ModalProps {
  title?: ReactNode | string
  footer?: ReactNode
  closeIcon?: ReactNode
  headerProps?: ModalHeaderProps
  contentProps?: ModalContentProps
  bodyProps?: ModalBodyProps
  footerProps?: ModalFooterProps
  overlayProps?: ModalOverlayProps
  hideCloseButton?: boolean
}

const HovModal: FC<PropsWithChildren<HovModalProps>> = (props) => {
  const {
    title,
    children,
    footer,
    closeIcon,
    headerProps,
    contentProps,
    bodyProps,
    footerProps,
    overlayProps,
    hideCloseButton,
  } = props

  return (
    <Modal {...props}>
      <ModalOverlay {...overlayProps} />
      <ModalContent {...contentProps}>
        <ModalHeader {...headerProps}>{title}</ModalHeader>
        {!hideCloseButton &&
          (!closeIcon ? (
            <ModalCloseButton color="gray.400" mr={1} mt={1} />
          ) : (
            <ModalCloseButton>{closeIcon}</ModalCloseButton>
          ))}
        <ModalBody {...bodyProps} pb={0}>
          {children}
        </ModalBody>
        <ModalFooter {...footerProps} height={6} padding={0}>
          {footer}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default HovModal

import React from "react";
import PropTypes from "prop-types";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";

export function BaseModal({
    children,
    open,
    modalHeader,
    shouldDisplayCloseIcon,
    headerClasses,
    ...props
}) {
    return (
        <Modal isOpen={open} isCentered {...props}>
            <ModalOverlay />
            <ModalContent marginX={10}>
                <ModalHeader
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    className={headerClasses}
                >
                    {modalHeader}
                    {shouldDisplayCloseIcon && (
                        <ModalCloseButton pos={"unset"} height={"100%"} width={"auto"} />
                    )}
                </ModalHeader>
                <ModalBody padding={"8px 24px 24px"}>{children}</ModalBody>
            </ModalContent>
        </Modal>
    );
}

BaseModal.defaultProps = {
    open: false,
    modalHeader: "",
    shouldDisplayCloseIcon: true,
    headerClasses: "",
};

BaseModal.propTypes = {
    open: PropTypes.bool,
    modalHeader: PropTypes.any,
    shouldDisplayCloseIcon: PropTypes.bool,
    headerClasses: PropTypes.string,
};

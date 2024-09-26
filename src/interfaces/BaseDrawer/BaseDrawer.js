import React from "react";
import PropTypes from "prop-types";
import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
} from "@chakra-ui/react";

export function BaseDrawer({
    children,
    open,
    onClose,
    size,
    drawerHeader,
    closeIcon,
    variant,
    drawerHeaderClasses,
    drawerBodyClasses,
}) {
    return (
        <Drawer
            isOpen={open}
            placement="right"
            onClose={onClose}
            size={size}
            variant={variant}
        >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader className={drawerHeaderClasses}>
                    {drawerHeader}
                    <DrawerCloseButton
                        top={0}
                        bottom={0}
                        transform={"translate(0%, 50%)"}
                    >
                        {closeIcon}
                    </DrawerCloseButton>
                </DrawerHeader>
                <DrawerBody className={drawerBodyClasses}>{children}</DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

BaseDrawer.defaultProps = {
    open: false,
    onClose: () => { },
    drawerHeader: "",
    drawerHeaderClasses: "",
    drawerBodyClasses: "",
};

BaseDrawer.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    size: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl", "full"]),
    drawerHeader: PropTypes.any,
    closeIcon: PropTypes.element,
    variant: PropTypes.string,
    drawerHeaderClasses: PropTypes.string,
    drawerBodyClasses: PropTypes.string,
};

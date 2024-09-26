import React, { ReactNode } from "react";
import "./modal.css";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/solid";
import IconButton from "../IconButton/IconButton";
import ScrollArea from "../ScrollArea/ScrollArea";

interface ModalProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  controls?: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: Function;
  onClose?: Function;
  blurBackground?: boolean;
  className?: string;
  [key: string]: any;
}

const Modal: React.FC<ModalProps> = ({
  title,
  description,
  children,
  controls,
  defaultOpen,
  open,
  onOpenChange,
  onClose,
  blurBackground,
  className,
  hideClose = false,
  ...props
}) => {
  return (
    <Dialog.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      modal={blurBackground}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="oui-modal__overlay" />
        <Dialog.Content className={clsx("oui-modal__box", className)}>
          {title && (
            <Dialog.Title className="oui-modal__title">{title}</Dialog.Title>
          )}
          {description && (
            <Dialog.Description className="oui-modal__description">
              {description}
            </Dialog.Description>
          )}
          <ScrollArea className="oui-modal__body" orientation="vertical">
            {children}
          </ScrollArea>
          {/* <div className="oui-modal__body">{children}</div> */}
          {controls && <div className="oui-modal__controls">{controls}</div>}
          {!hideClose && (
            <Dialog.Close asChild>
              <IconButton
                context="secondary"
                className="oui-modal__close-button"
                aria-label="Close"
                onClick={onClose}
              >
                <XMarkIcon />
              </IconButton>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;

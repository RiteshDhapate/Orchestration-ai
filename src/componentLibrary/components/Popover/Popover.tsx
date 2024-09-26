import React, { ReactNode } from "react";
import "./popover.css";
import * as RadixPopover from "@radix-ui/react-popover";
import clsx from "clsx";

interface PopoverProps {
  children?: ReactNode;
  content?: ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
  disableHoverableContent?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: Function;
  forceMount?: boolean;
  container?: HTMLElement;
  onEscapeKeyDown?: Function;
  onPointerDownOutside?: Function;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  avoidCollisions?: boolean;
  collisionBoundary;
  collisionPadding?: number;
  arrowPadding?: number;
  sticky?: "partial" | "always";
  hideWhenDetached?: boolean;
  hasArrow?: boolean;
  modal?: boolean;
  className?: string;
  [key: string]: any;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  className,
  content,
  delayDuration = 700,
  skipDelayDuration = 300,
  disableHoverableContent,
  defaultOpen,
  open,
  onOpenChange,
  forceMount,
  container,
  onEscapeKeyDown,
  onPointerDownOutside,
  side = "top",
  sideOffset,
  align = "center",
  alignOffset = 0,
  avoidCollisions = true,
  collisionBoundary,
  collisionPadding = 0,
  arrowPadding = 0,
  sticky = "partial",
  hideWhenDetached,
  hasArrow = true,
  modal = false,
  ...props
}) => {
  return (
    <RadixPopover.Root
      defaultOpen={defaultOpen}
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      <RadixPopover.Trigger>{children}</RadixPopover.Trigger>
      <RadixPopover.Portal forceMount={forceMount} container={container}>
        <RadixPopover.Content
          className={clsx("oui-popover__content", className)}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          side={side}
          sideOffset={sideOffset}
          align={align}
          alignOffset={alignOffset}
          avoidCollisions={avoidCollisions}
          collisionBoundary={collisionBoundary}
          collisionPadding={collisionPadding}
          arrowPadding={arrowPadding}
          sticky={sticky}
          hideWhenDetached={hideWhenDetached}
        >
          {content}
          {hasArrow && <RadixPopover.Arrow className="oui-popover__arrow" />}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

export default Popover;

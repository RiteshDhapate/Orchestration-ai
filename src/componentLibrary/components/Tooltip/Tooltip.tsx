import React, { ReactNode } from "react";
import "./tooltip.css";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";

interface TooltipProps {
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
  className?: string;
  [key: string]: any;
}

const Tooltip: React.FC<TooltipProps> = ({
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
  ...props
}) => {
  return (
    <RadixTooltip.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
      {...props}
    >
      <RadixTooltip.Root
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
      >
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal forceMount={forceMount} container={container}>
          <RadixTooltip.Content
            className={clsx("oui-tooltip__content", className)}
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
            {hasArrow && <RadixTooltip.Arrow className="oui-tooltip__arrow" />}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;

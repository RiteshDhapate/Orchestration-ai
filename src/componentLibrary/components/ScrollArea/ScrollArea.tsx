import React, { ReactNode } from "react";
import "./scrollArea.css";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import clsx from "clsx";

interface ScrollAreaProps {
  children?: ReactNode;
  type?: "auto" | "always" | "scroll" | "hover";
  scrollHideDelay?: number;
  forceMount: boolean;
  orientation: "horizontal" | "vertical";
  className?: string;
  [key: string]: any;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({
  children,
  type = "hover",
  scrollHideDelay = 600,
  forceMount,
  orientation = "vertical",
  className,
  ...props
}) => {
  return (
    <RadixScrollArea.Root
      type={type}
      scrollHideDelay={scrollHideDelay}
      className={"oui-scrollArea"}
      {...props}
    >
      <RadixScrollArea.Viewport
        className={clsx("oui-scrollArea__viewport", className)}
      >
        {children}
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        orientation={orientation}
        forceMount={forceMount}
        className="oui-scrollArea__scrollbar"
      >
        <RadixScrollArea.Thumb className="oui-scrollArea__thumb" />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner />
    </RadixScrollArea.Root>
  );
};

export default ScrollArea;

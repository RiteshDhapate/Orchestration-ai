import React, { ReactNode } from "react";
import * as RadixTab from "@radix-ui/react-tabs";

interface TabWrapperProps {
  children?: ReactNode;
  defaultValue?: string;
  value?: string;
  onValueChange?: Function;
  orientation?: "horizontal" | "vertical";
  activationMode?: "automatic" | "manual";
  className?: string;
  [key: string]: any;
}

const TabWrapper: React.FC<TabWrapperProps> = ({
  children,
  defaultValue,
  value,
  onValueChange,
  orientation = "horizontal",
  activationMode = "automatic",
  className,
  ...props
}) => {
  return (
    <RadixTab.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      orientation={orientation}
      activationMode={activationMode}
      className={className}
      {...props}
    >
      {children}
    </RadixTab.Root>
  );
};

export default TabWrapper;

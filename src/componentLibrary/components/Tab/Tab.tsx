import React, { ReactNode } from "react";
import * as RadixTab from "@radix-ui/react-tabs";
import clsx from "clsx";
import "./tab.css";

interface TabProps {
  children?: ReactNode;
  disabled?: boolean;
  value: string;
  className?: string;
  [key: string]: any;
}

const Tab: React.FC<TabProps> = ({
  children,
  disabled = false,
  value,
  className,
  ...props
}) => {
  return (
    <RadixTab.Trigger
      disabled={disabled}
      value={value}
      className={clsx("oui-tab", className)}
      {...props}
    >
      {children}
    </RadixTab.Trigger>
  );
};

export default Tab;

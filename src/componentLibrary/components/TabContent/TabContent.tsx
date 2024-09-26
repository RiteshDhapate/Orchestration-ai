import React, { ReactNode } from "react";
import * as RadixTab from "@radix-ui/react-tabs";

interface TabContentProps {
  children?: ReactNode;
  forceMount?: boolean;
  value: string;
  className?: string;
  [key: string]: any;
}

const TabContent: React.FC<TabContentProps> = ({
  children,
  forceMount = false,
  value,
  className,
  ...props
}) => {
  return (
    <RadixTab.Content
      forceMount={forceMount}
      value={value}
      className={className}
      {...props}
    >
      {children}
    </RadixTab.Content>
  );
};

export default TabContent;

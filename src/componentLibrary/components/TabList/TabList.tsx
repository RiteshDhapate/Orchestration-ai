import React, { ReactNode } from "react";
import * as RadixTab from "@radix-ui/react-tabs";

interface TabListProps {
  children?: ReactNode;
  loop?: boolean;
  className?: string;
  [key: string]: any;
}

const TabList: React.FC<TabListProps> = ({
  children,
  loop,
  className,
  ...props
}) => {
  return (
    <RadixTab.List loop={loop} className={className} {...props}>
      {children}
    </RadixTab.List>
  );
};

export default TabList;

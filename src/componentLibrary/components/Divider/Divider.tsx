import React from "react";
import "./divider.css";
import clsx from "clsx";
import * as Seperator from "@radix-ui/react-navigation-menu";

interface DividerProps {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
  className?: string;
  [key: string]: any;
}

const Divider: React.FC<DividerProps> = ({
  orientation = "vertical",
  decorative = false,
  className,
  ...props
}) => {
  return (
    <Seperator.Root
      orientation={orientation}
      decorative={decorative}
      className={clsx(`oui-divider--${orientation}`, className)}
      {...props}
    />
  );
};

export default Divider;

import React, { ReactNode } from "react";
import "./radioGroup.css";
import clsx from "clsx";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";

interface RadioGroupProps {
  orientation?: "horizontal" | "vertical";
  value?: string;
  defaultValue?: string;
  onValueChange?: Function;
  children?: ReactNode;
  className?: string;
  [key: string]: any;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  orientation = "vertical",
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  ...props
}) => {
  return (
    <RadixRadioGroup.Root
      orientation={orientation}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={clsx(
        "oui-radioGroup",
        `oui-radioGroup--${orientation}`,
        className
      )}
      {...props}
    >
      {children}
    </RadixRadioGroup.Root>
  );
};

export default RadioGroup;

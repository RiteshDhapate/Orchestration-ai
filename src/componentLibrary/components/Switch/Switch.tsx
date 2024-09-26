import React from "react";
import "./switch.css";
import clsx from "clsx";
import * as RadixSwitch from "@radix-ui/react-switch";

interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  [key: string]: any;
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  disabled = false,
  className,
  ...props
}) => {
  return (
    <RadixSwitch.Root
      className={clsx(
        "oui-switch",
        `oui-switch--${checked ? "checked" : "unchecked"}`,
        className
      )}
      checked={checked}
      disabled={disabled}
      {...props}
    >
      <RadixSwitch.Thumb className="oui-switch__thumb" />
    </RadixSwitch.Root>
  );
};

export default Switch;

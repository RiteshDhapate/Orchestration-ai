import React from "react";
import "./radio.css";
import clsx from "clsx";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";

interface RadioProps {
  value: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  [key: string]: any;
}

const Radio: React.FC<RadioProps> = ({
  value,
  disabled = false,
  error = false,
  className,
  ...props
}) => {
  return (
    <span
      className={clsx(
        "oui-radio__outer",
        disabled && "oui-radio__outer--disabled",
        className
      )}
    >
      <RadixRadioGroup.Item
        className={clsx("oui-radio", error && `oui-radio--error`)}
        value={value}
        disabled={disabled}
        {...props}
      >
        <RadixRadioGroup.Indicator className="oui-radio__indicator" />
      </RadixRadioGroup.Item>
    </span>
  );
};

export default Radio;

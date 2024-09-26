import React from "react";
import "./checkbox.css";
import clsx from "clsx";
import { CheckIcon, MinusIcon } from "@heroicons/react/24/solid";
import * as RadixCheckbox from "@radix-ui/react-checkbox";

interface CheckboxProps {
  disabled?: boolean;
  error?: boolean;
  checked?: boolean | "indeterminate";
  className?: string;
  [key: string]: any;
}

const Checkbox: React.FC<CheckboxProps> = ({
  disabled = false,
  error = false,
  checked = false,
  className,
  ...props
}) => {
  return (
    <span
      className={clsx(
        "oui-checkbox__outer",
        disabled && "oui-checkbox__outer--disabled",
        className
      )}
    >
      <RadixCheckbox.Root
        className={clsx(
          "oui-checkbox",
          `oui-checkbox--checked-${checked}`,
          error && `oui-checkbox--error`
        )}
        checked={checked}
        disabled={disabled}
        {...props}
      >
        <RadixCheckbox.Indicator className="oui-checkbox__indicator">
          {checked === true && <CheckIcon />}
          {checked === "indeterminate" && (
            <MinusIcon className="oui-checkbox__indicator" />
          )}
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
    </span>
  );
};

export default Checkbox;

import React from "react";
import "./chip.css";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface ChipProps {
  label?: string;
  prefixIcon?: Node;
  onClose?: boolean | Function;
  onClick?: boolean | Function;
  disabled?: boolean;
  mode?: "solid" | "outlined";
  context?: "primary" | "danger";
  className?: string;
  [key: string]: any;
}

const Chip: React.FC<ChipProps> = ({
  label,
  prefixIcon,
  onClick,
  onClose,
  disabled = false,
  mode = "solid",
  context = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "oui-chip",
        `oui-chip--${mode}`,
        `oui-chip--${context}`,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {prefixIcon}
      <span>{label}</span>
      {onClose && <XMarkIcon onClick={onClose} />}
    </button>
  );
};

export default Chip;

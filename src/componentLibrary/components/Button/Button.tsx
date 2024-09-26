import React, { ReactNode } from "react";
import "./button.css";
import clsx from "clsx";

interface ButtonProps {
  children?: ReactNode;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
  disabled?: boolean;
  context?:
    | "primary"
    | "secondary"
    | "text"
    | "outlined"
    | "outlinedSecondary"
    | "textSecondary";
  className?: string;
  [key: string]: any;
}

const Button: React.FC<ButtonProps> = ({
  prefixIcon,
  suffixIcon,
  children,
  disabled = false,
  context = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx("oui-button", `oui-button--${context}`, className)}
      disabled={disabled}
      {...props}
    >
      {prefixIcon}
      <span>{children}</span>
      {suffixIcon}
    </button>
  );
};

export default Button;

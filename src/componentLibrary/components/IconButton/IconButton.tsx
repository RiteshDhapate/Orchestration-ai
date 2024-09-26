import React, { ReactNode } from "react";
import "./iconButton.css";
import clsx from "clsx";

interface IconButtonProps {
  children?: ReactNode;
  disabled?: boolean;
  context?: "primary" | "secondary" | "danger";
  className?: string;
  [key: string]: any;
}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  disabled = false,
  context = "primary",
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        "oui-iconButton",
        `oui-iconButton--${context}`,
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;

import React, { ReactNode } from "react";
import "./badgeDot.css";
import clsx from "clsx";

interface BadgeDotProps {
  children?: ReactNode;
  context?: "alert" | "success" | "warning" | "error";
  size?: "small" | "large";
  placement?: "bottomRight" | "bottomLeft" | "topRight" | "topLeft";
  className?: string;
  [key: string]: any;
}

const BadgeDot: React.FC<BadgeDotProps> = ({
  children,
  context = "alert",
  size = "small",
  placement = "topRight",
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "oui-badgeDot",
        `oui-badgeDot--${context}`,
        `oui-badgeDot--${size}`,
        `oui-badgeDot--${placement}`,
        className
      )}
      {...props}
    >
      <div className="badgeDot__indicator"></div>
      {children}
    </div>
  );
};

export default BadgeDot;

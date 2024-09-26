import React from "react";
import "./badge.css";
import clsx from "clsx";

interface BadgeProps {
  text?: string;
  context?: "alert" | "success" | "warning" | "error";
  className?: string;
  [key: string]: any;
}

const Badge: React.FC<BadgeProps> = ({
  text,
  context = "alert",
  className,
  ...props
}) => {
  return (
    <div
      className={clsx("oui-badge", `oui-badge--${context}`, className)}
      {...props}
    >
      {text}
    </div>
  );
};

export default Badge;

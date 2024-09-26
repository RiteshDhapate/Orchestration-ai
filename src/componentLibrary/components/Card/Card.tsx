import React, { ReactNode } from "react";
import "./card.css";
import clsx from "clsx";

interface CardProps {
  children?: ReactNode;
  padding?: "none" | "light" | "medium" | "heavy";
  bordered?: boolean;
  className?: string;
  [key: string]: any;
}

const Card: React.FC<CardProps> = ({
  children,
  padding = "none",
  bordered = false,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx(
        "oui-card",
        `oui-card--padding-${padding}`,
        { "oui-card--bordered": bordered },
        `oui-card--padding-bordered`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

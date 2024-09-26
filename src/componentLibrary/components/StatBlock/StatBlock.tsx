import React from "react";
import "./statBlock.css";
import clsx from "clsx";
import Card from "../Card/Card.tsx";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

interface StatBlockProps {
  trend?: "up" | "down";
  title?: string;
  value?: string;
  className?: string;
  [key: string]: any;
}

const StatBlock: React.FC<StatBlockProps> = ({
  trend,
  title,
  value,
  className,
  ...props
}) => {
  return (
    <Card
      padding="heavy"
      className={clsx("oui-stat-block", `oui-stat-block--${trend}`, className)}
      {...props}
    >
      <div className="oui-stat-block__title">{title}</div>
      <div className="oui-stat-block__footer">
        <div className="oui-stat-block__value">{value}</div>
        {trend === "up" && <ArrowUpIcon className="oui-stat-block__icon" />}
        {trend === "down" && <ArrowDownIcon className="oui-stat-block__icon" />}
      </div>
    </Card>
  );
};

export default StatBlock;

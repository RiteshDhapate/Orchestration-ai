import React from "react";
import clsx from "clsx";
import * as SVG from "./SVG";

interface LogoProps {
  mode?: "light" | "dark";
  height?: string;
  width?: string;
  className?: string;
  [key: string]: any;
}

const Logo: React.FC<LogoProps> = ({
  mode,
  width = "auto",
  height = "100%",
  className,
  ...props
}) => {
  const Svg = SVG[mode[0].toUpperCase() + mode.slice(1)];
  return (
    <div className={clsx("oui-logo", className)} {...props}>
      <Svg width={width} height={height} />
    </div>
  );
};

export default Logo;

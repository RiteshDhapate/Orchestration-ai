import React, { ReactNode } from "react";
import "./navMenuItem.css";
import clsx from "clsx";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

interface NavMenuItemProps {
  children?: ReactNode;
  href?: string;
  value?: string;
  asChild?: boolean;
  selected?: boolean;
  className?: string;
  [key: string]: any;
}

const NavMenuItem: React.FC<NavMenuItemProps> = ({
  children,
  label,
  icon,
  href,
  // asChild = true,
  selected = false,
  value,
  className,
  ...props
}) => {
  var inner = (
    <>
      <span className="oui-nav-menu-item__inner">
        <span className="oui-nav-menu-item__icon">{icon}</span>
        <span className="oui-nav-menu-item__text">{label}</span>
      </span>
      <span className="oui-nav-menu-item__icon">
        <ChevronRightIcon className="oui-nav-menu-item__icon" />
      </span>
    </>
  );

  return (
    <NavigationMenu.Item
      asChild={href}
      value={value}
      className={clsx(
        "oui-nav-menu-item",
        selected && "oui-nav-menu-item--selected",
        className
      )}
      {...props}
    >
      {href ? <NavigationMenu.Link>{inner}</NavigationMenu.Link> : inner}
    </NavigationMenu.Item>
  );
};

export default NavMenuItem;

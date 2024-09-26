import React, { ReactNode } from "react";
import "./navMenu.css";
import clsx from "clsx";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";

interface NavMenuProps {
  children?: ReactNode;
  asChild?: boolean;
  className?: string;
  [key: string]: any;
}

const NavMenu: React.FC<NavMenuProps> = ({
  children,
  asChild,
  className,
  ...props
}) => {
  return (
    <NavigationMenu.Root
      data-orientation="vertical"
      className={clsx("oui-nav-menu", className)}
      {...props}
    >
      <NavigationMenu.List
        data-orientation="vertical"
        className="oui-nav-menu__list"
      >
        {children}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default NavMenu;

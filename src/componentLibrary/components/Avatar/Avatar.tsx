import React from "react";
import "./avatar.css";
import * as RadixAvatar from "@radix-ui/react-avatar";
import clsx from "clsx";

interface AvatarProps {
  onClick?: Function;
  initials?: string;
  imageAlt?: string;
  imageSrc?: string;
  size?: "small" | "large";
  className?: string;
  [key: string]: any;
}

const Avatar: React.FC<AvatarProps> = ({
  onClick,
  initials,
  imageAlt,
  imageSrc,
  size = "small",
  className,
  ...props
}) => {
  return (
    <RadixAvatar.Root
      onClick={onClick}
      className={clsx("oui-avatar", `oui-avatar--${size}`, className)}
      {...props}
    >
      <RadixAvatar.Image
        className="oui-avatar__image"
        src={imageSrc}
        alt={imageAlt}
      />
      <RadixAvatar.Fallback className="oui-avatar__fallback" delayMs={600}>
        {initials}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

export default Avatar;

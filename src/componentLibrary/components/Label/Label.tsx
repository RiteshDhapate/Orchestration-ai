import React, { ReactNode } from "react";
import * as RadixLabel from "@radix-ui/react-label";

type LabelPropsWithChildren = {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
  [key: string]: any;
};

type LabelPropsWithoutChildren = {
  children?: never;
  htmlFor: string;
  className?: string;
  [key: string]: any;
};

type LabelProps = LabelPropsWithChildren | LabelPropsWithoutChildren;

const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className,
  ...props
}) => {
  return (
    <RadixLabel.Root className={className} {...props} htmlFor={htmlFor}>
      {children}
    </RadixLabel.Root>
  );
};

export default Label;

import Button from "./Button.tsx";
import { RocketLaunchIcon, FaceSmileIcon } from "@heroicons/react/24/solid";

export default {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    context: "primary",
    disabled: false,
    prefixIcon: <FaceSmileIcon />,
    suffixIcon: <RocketLaunchIcon />,
    children: "hello",
  },
};

export const Example = {
  args: {
    disabled: false,
    context: "secondary",
  },
};

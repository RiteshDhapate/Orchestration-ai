import Chip from "./Chip.tsx";
import { RocketLaunchIcon, FaceSmileIcon } from "@heroicons/react/24/solid";

export default {
  title: "Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    context: "primary",
    mode: "solid",
    disabled: false,
    prefixIcon: <FaceSmileIcon />,
    onClose: () => {},
    onClick: () => {},
    label: "hello",
  },
};

export const Example = {
  args: {
    disabled: false,
    context: "secondary",
  },
};

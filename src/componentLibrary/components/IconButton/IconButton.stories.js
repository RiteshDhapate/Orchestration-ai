import IconButton from "./IconButton.tsx";
import { FaceSmileIcon } from "@heroicons/react/24/solid";

export default {
  title: "IconButton",
  component: IconButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    context: "primary",
    disabled: false,
    children: <FaceSmileIcon />,
  },
};

export const Example = {
  args: {
    disabled: false,
    context: "secondary",
  },
};

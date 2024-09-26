import Popover from "./Popover.tsx";

export default {
  title: "Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: <button className="text-white">lorem</button>,
    content: "dolorem ipsum",
  },
};

export const Example = {
  args: {
    children: <button className="text-white">dolorem</button>,
    content: "lorem de ipsum",
  },
};

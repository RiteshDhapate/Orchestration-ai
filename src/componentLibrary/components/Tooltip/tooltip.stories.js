import Tooltip from "./Tooltip.tsx";

export default {
  title: "Tooltip",
  component: Tooltip,
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

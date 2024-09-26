import StatBlock from "./StatBlock.tsx";

export default {
  title: "StatBlock",
  component: StatBlock,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { trend: "up", title: "Lorem ipsum", value: "95%" },
  className: "h-80 w-80",
};

export const Example = {
  args: {
    trend: "up",
    title: "Lorem ipsum",
    value: "95%",
  },
};

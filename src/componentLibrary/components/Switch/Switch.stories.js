import Switch from "./Switch.tsx";

export default {
  title: "Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    checked: true,
    disabled: false,
    className: undefined,
  },
};

export const Example = {
  args: {
    checked: true,
    disabled: false,
  },
};

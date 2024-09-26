import Checkbox from "./Checkbox.tsx";

export default {
  title: "Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    checked: "indeterminate",
    error: false,
    disabled: false,
  },
};

export const Example = {
  args: {
    checked: true,
    error: false,
    disabled: false,
  },
};

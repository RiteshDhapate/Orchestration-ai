import Label from "./Label.tsx";

export default {
  title: "Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    htmlFor: "dolorem-input",
    children: <>lorem ipsum</>,
    className: "text-white font-bold",
  },
};

export const Example = {
  args: {
    htmlFor: "lorem-input",
    children: <>dolorem ipsum</>,
    className: "text-white font-bold",
  },
};

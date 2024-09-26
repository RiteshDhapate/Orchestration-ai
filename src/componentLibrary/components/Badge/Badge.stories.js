import Badge from "./Badge.tsx";

export default {
  title: "Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    context: "alert",
    text: "Lorem ipsum",
  },
};

export const Example = {
  args: {
    context: "error",
    text: "Lorem ipsum",
  },
};

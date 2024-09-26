import BadgeDot from "./BadgeDot.tsx";
import Badge from "../Badge/Badge.tsx";

export default {
  title: "BadgeDot",
  component: BadgeDot,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    context: {
      options: ["alert", "success", "warning", "error"],
      control: { type: "radio" },
    },
    size: {
      options: ["small", "large"],
      control: { type: "radio" },
    },
    placement: {
      options: ["topRight", "bottomRight", "topLeft", "bottomLeft"],
      control: { type: "radio" },
    },
  },
  render: (args) => (
    <BadgeDot {...args}>
      <Badge text="lorem ipsum" />
    </BadgeDot>
  ),
};

export const Example = {};

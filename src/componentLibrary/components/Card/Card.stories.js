import Card from "./Card.tsx";

export default {
  title: "Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { children: <span>lorem ipsum</span> },
  className: "h-80 w-80",
};

export const Example = {
  args: {
    padding: "small",
    children: <span>lorem ipsum</span>,
    className: "h-80 w-80",
  },
};

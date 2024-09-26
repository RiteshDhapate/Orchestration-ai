import Logo from "./Logo.tsx";

export default {
  title: "Logo",
  component: Logo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { width: "100px", mode: "light" },
  className: "h-80 w-80",
};

export const Example = {
  args: {
    width: "150px",
    mode: "dark",
  },
};

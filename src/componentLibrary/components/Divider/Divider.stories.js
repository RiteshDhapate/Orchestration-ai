import Divider from "./Divider.tsx";

export default {
  title: "Divider",
  component: Divider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  render: () => (
    <div className="w-80 h-80" value="1">
      <Divider />
    </div>
  ),
};

export const Example = {
  args: {
    orientation: "horizontal",
  },
};

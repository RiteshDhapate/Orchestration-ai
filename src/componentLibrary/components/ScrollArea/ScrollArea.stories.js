import ScrollArea from "./ScrollArea.tsx";

export default {
  title: "ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  type: "hover",
  scrollHideDelay: 600,
  forceMount: true,
  orientation: "vertical",
  render: (props) => (
    <ScrollArea className="w-48 h-48" {...props}>
      <div className="flex flex-col gap-10">
        <div className="bg-green-300 h-[100px]" />
        <div className="bg-blue-300 h-[100px]" />
        <div className="bg-red-300 h-[100px]" />
        <div className="bg-purple-300 h-[100px]" />
        <div className="bg-yellow-300 h-[100px]" />
      </div>
    </ScrollArea>
  ),
};

export const Example = {};

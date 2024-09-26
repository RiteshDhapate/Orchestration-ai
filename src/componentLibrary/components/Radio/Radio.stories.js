import Radio from "./Radio.tsx";
import RadioGroup from "../RadioGroup/RadioGroup.tsx";

export default {
  title: "Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    value: "1",
    error: false,
    disabled: false,
  },
  render: () => (
    <RadioGroup className="w-60 text-white" value="1">
      <div className="flex gap-2 items-center">
        <Radio value="1" disabled />
        <label>lorem</label>
      </div>
      <div className="flex gap-2 items-center">
        <Radio value="1" disabled />
        <label>lorem</label>
      </div>
      <div className="flex gap-2 items-center">
        <Radio value="1" error />
        <label>lorem</label>
      </div>
      <div className="flex gap-2 items-center">
        <Radio value="1" />
        <label>lorem</label>
      </div>
      <div className="flex gap-2 items-center">
        <Radio value="1" error />
        <label>lorem</label>
      </div>
    </RadioGroup>
  ),
};

export const Example = {
  args: {
    value: "1",
    error: false,
    disabled: false,
  },
};

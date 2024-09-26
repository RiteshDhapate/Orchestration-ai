import Modal from "./Modal.tsx";
import Button from "../Button/Button.tsx";
import React, { useState } from "react";

export default {
  title: "Modal",
  component: Modal,
  parameters: {
    design: {
      type: "figma",
    },
  },
};

export const Example = {
  args: {
    title: "Lorem ipsum",
    description: "Dolorem ipsum et al en dolor volorem",
    controls: (
      <>
        <Button context="textSecondary">ipsum</Button>
        <Button>lorem</Button>
      </>
    ),
    blurBackground: true,
    children: <div className="h-[100vh] w-full bg-gray-500" />,
  },
  render: ({ children, ...args }) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          {...args}
          open={open}
          onClose={() => setOpen(false)}
          onOpenChange={setOpen}
        >
          {children}
        </Modal>
      </>
    );
  },
};

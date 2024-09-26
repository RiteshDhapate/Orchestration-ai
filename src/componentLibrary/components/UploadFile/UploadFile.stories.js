import UploadFile from "./UploadFile.tsx";

export default {
  title: "UploadFile",
  component: UploadFile,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Example = {
  args: {
    disabled: false,
    name: "file-upload",
    id: "file-upload-id",
  },
};

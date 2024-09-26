import Avatar from "./Avatar.tsx";

export default {
  title: "Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    size: "small",
    initials: "LI",
    imageSrc:
      "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
    imageAlt: "Lorem Ipsum",
  },
};

export const Example = {
  args: {
    size: "small",
    initials: "LI",
    imageSrc:
      "https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80",
    imageAlt: "Lorem Ipsum",
  },
};

/** @type { import('@storybook/react').Preview } */
import "../src/index.css";
const preview = {
  parameters: {
    backgrounds: {
      default: "dark surface",
      values: [
        {
          name: "dark surface",
          value: "#050E1A",
        },
        {
          name: "light surface",
          value: "#EBEBEB",
        },
        {
          name: "alternative surface 1",
          value: "#00152E",
        },
        {
          name: "alternative surface 2",
          value: "#001938",
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

export const globalTypes = {
  darkMode: true,
};

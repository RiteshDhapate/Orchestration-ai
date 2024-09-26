import Tab from "./Tab.tsx";
import TabContent from "../TabContent/TabContent.tsx";
import TabWrapper from "../TabWrapper/TabWrapper.tsx";
import TabList from "../TabList/TabList.tsx";

export default {
  title: "Tab",
  component: Tab,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/1WifuerwBjlveml00QmXhC/Orchestro-Design-System?type=design&node-id=139%3A31633&mode=design&t=DvGgEUFoueb5ItHp-1",
    },
  },
};

export const OneTab = {
  args: {
    value: "1",
    disabled: false,
    children: "lorem",
  },
  render: ({ children, ...args }) => (
    <TabWrapper className="text-white w-40" defaultValue="1">
      <TabList className="flex mb-4 gap-2">
        <Tab {...args}>{children}</Tab>
      </TabList>
      <TabContent value="1">lorem content</TabContent>
    </TabWrapper>
  ),
};

export const MultipleTabs = {
  parameters: {
    controls: {
      exclude: /.*/g,
    },
  },
  render: () => (
    <TabWrapper className="text-white" defaultValue="1">
      <TabList className="flex mb-4 gap-2">
        <Tab value="1">lorem</Tab>
        <Tab value="2">ipsum</Tab>
        <Tab value="3">dolorem</Tab>
        <Tab value="4" disabled>
          et al
        </Tab>
      </TabList>
      <TabContent value="1">lorem content</TabContent>
      <TabContent value="2">ipsum content</TabContent>
      <TabContent value="3">dolorem content</TabContent>
      <TabContent value="4">et al content</TabContent>
    </TabWrapper>
  ),
};

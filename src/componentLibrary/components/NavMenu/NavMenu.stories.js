import NavMenu from "./NavMenu.tsx";
import NavMenuItem from "../NavMenuItem/NavMenuItem.tsx";
import Divider from "../Divider/Divider.tsx";
import {
  CloudArrowUpIcon,
  RocketLaunchIcon,
  LightBulbIcon,
} from "@heroicons/react/24/solid";

export default {
  title: "NavMenu",
  component: NavMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  className: "h-80 w-80",
  render: () => (
    <NavMenu className="w-60" value="1">
      <NavMenuItem icon={<CloudArrowUpIcon />} label="lorem ipsum et all" />
      <NavMenuItem
        icon={<CloudArrowUpIcon />}
        label="dolorem ipsum"
        href="https://google.com"
      />
      <Divider />
      <NavMenuItem
        icon={<RocketLaunchIcon />}
        label="ipsum de et"
        href="https://google.com"
      />
      <NavMenuItem icon={<LightBulbIcon />} label="lin ipsum et all" />
    </NavMenu>
  ),
};

export const Example = {};

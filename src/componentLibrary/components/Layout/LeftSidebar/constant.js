// src/constants/sidebarLabels.js

import {
  DollarIcon,
  EcoFriendlyIcon,
  HomeIcon,
  PackagingIcon,
  TimerIcon,
  TruckIcon,
} from "../../../../assets/Icons";

export const TOPICS = [
  {
    label: "All Posts",
    Icon: HomeIcon, // Import and reference the icon component
    star: 0,
  },
  {
    label: "Carrier Comparison",
    Icon: TruckIcon,
    star: 0,
  },
  {
    label: "Packaging",
    Icon: PackagingIcon,
    star: 1,
  },
  {
    label: "Cost Optimization",
    Icon: DollarIcon,
    star: 1,
  },
  {
    label: "Eco-Packaging",
    Icon: EcoFriendlyIcon,
    star: 1,
  },
  {
    label: "Last Mile Innovation",
    Icon: TruckIcon,
    star: 0,
  },
  {
    label: "Delivery Speed",
    Icon: TimerIcon,
    star: 1,
  },
];

export const GROUPS = [
  {
    label: "Eco-Packaging",
    Icon: EcoFriendlyIcon,
    star: 0,
  },
  {
    label: "Cost Optimization",
    Icon: DollarIcon,
    star: 1,
  },
  {
    label: "Delivery Speed",
    Icon: TimerIcon,
    star: 0,
  },
  {
    label: "Last Mile Innovation",
    Icon: TruckIcon,
    star: 1,
  },
];

export const USERS = [
  {
    name: "John Smith",
    position: "Shipping expert",
  },
  {
    name: "Mary Jane",
    position: "Auditor",
  },
  {
    name: "Ralph Doe",
    position: "UPS integration",
  },
  {
    name: "Rahul Jain",
    position: "WMS expert",
  },
  {
    name: "Shely Musk",
    position: "Carrier Solutions",
  },
];

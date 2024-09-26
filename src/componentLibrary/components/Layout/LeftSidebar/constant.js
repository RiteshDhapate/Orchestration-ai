// src/constants/sidebarLabels.js
import AnanthImage from "../../../../assets/user_a.jpg"
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
    name: "Ananth ms",
    position: "Shipping expert",
    img: AnanthImage,
  },
  {
    name: "Mary Jane",
    position: "Auditor",
    img: "https://th.bing.com/th/id/OIP.A_q4y0aCUjRCpm22Fb9mmgHaE8?w=260&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    name: "Ralph Doe",
    position: "UPS integration",
    img: "https://th.bing.com/th/id/R.623da373b80e4fce276770d0c1c91014?rik=HM3mBikNf62TzQ&riu=http%3a%2f%2fwww.surcorpgroup.com%2fcareerbuzz%2fwp-content%2fuploads%2f2010%2f05%2fEx_Business_Businessman-2.jpg&ehk=FkY8PybcWNoDJUQUgKrlZuZdwuBc2bSUcRU0U7TRFAk%3d&risl=&pid=ImgRaw&r=0",
  },
  {
    name: "Rahul Jain",
    position: "WMS expert",
    img: "https://th.bing.com/th/id/OIP.UGlKxiZQylR3CnJIXSbFIAHaLL?rs=1&pid=ImgDetMain",
  },
  {
    name: "Shely Musk",
    position: "Carrier Solutions",
    img: "https://www.shutterstock.com/image-photo/smiling-business-man-isolated-on-260nw-126207326.jpg",
  },
];

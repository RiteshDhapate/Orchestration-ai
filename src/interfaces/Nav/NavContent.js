import React  from "react";
import { NavLink } from "react-router-dom";
import {
  Text,
} from "@chakra-ui/react";

import classes from "./Nav.module.css";

const appRoot = "/app";

const NavContent = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? `${classes.links}`
      : classes.links;

  return (
    <>
      <nav className={classes.scrollBox} role="navigation">
        <ul className="list-none flex flex-col h-[inherit]">
              <li>
                <NavLink
                  className={linkClass}
                  to={appRoot + "/dashboard"}
                >
                  <img src="/images/nav/Gauge.svg" alt="Dashboard" className="h-[20px] mr-[8px]"/>
                  <Text>Dashboard</Text>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={linkClass}
                  to={appRoot + ""}
                >
                  <img src="/images/nav/IconSet.svg" alt="Disputes" className="h-[20px] mr-[8px]"/>
                  <Text>Disputes</Text>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={linkClass}
                  to={appRoot + ""}
                >
                  <img src="/images/nav/Payment.svg" alt="Payment" className="h-[20px] mr-[8px]"/>
                  <Text>Payments</Text>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={linkClass}
                  to={appRoot + ""}
                >
                  <img src="/images/nav/reports.svg" alt="Reports" className="h-[20px] mr-[8px]"/>
                  <Text>Reports</Text>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={linkClass}
                  to={appRoot + ""}
                >
                  <img src="/images/nav/automation.svg" alt="Settings" className="h-[20px] mr-[8px]"/>
                  <Text>Automations</Text>
                </NavLink>
              </li>
        </ul>
      </nav>
    </>
  );
};

export default NavContent;

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

import Logo from "../../componentLibrary/components/Logo";
import NavContent from "./NavContent";
import { UserContext } from "../Providers";
import classes from "./Nav.module.css";

export const Nav = () => {
  const { logoutUser } = useContext(UserContext);

  return (
    <Box className={classes.sidebar}>
      <div className={`${classes.logo} mb-[32px]`}>
        <Link to={"/"}>
          <Logo width="80px" mode="light" />
        </Link>
      </div>

      <NavContent />

      <hr className="my-4 border-gray-500" />

      <button className="pl-[24px] mb-8 flex items-center" onClick={logoutUser}>
        Logout
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 ml-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
          />
        </svg>
      </button>
      <Text className="text-center text-xs">Copyright © Sahyog Inc.</Text>
    </Box>
  );
};

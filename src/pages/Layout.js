// import React from "react";
// import { Outlet } from "react-router-dom";
// import { Flex, useMediaQuery } from "@chakra-ui/react";

// import { Nav, TopNav } from "../interfaces";
// import styles from "../css-files/Layout.module.css";

// function Layout() {
//   const [min1196] = useMediaQuery("(max-width: 1196px)");

//   return (
//     <>
//       <Flex flexDirection={min1196 ? "column" : "row"}>
//         {min1196 ? <TopNav /> : <Nav />}
//         <div className={styles.appContent}>
//           <main className={styles.main}>
//             <Outlet />
//           </main>
//         </div>
//       </Flex>
//     </>
//   );
// }

// export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import { TopNav } from "../interfaces";
import Chatbot from "./ChatBot";

const Layout = () => {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{
        backgroundColor: "#0E0F14",
        backgroundImage:
          "radial-gradient(farthest-side at 100% 10%, #1A8DBE30, #0E0F14),radial-gradient(farthest-side at 0% 100%, #1A8DBE30, #0E0F14)",
        backgroundSize: "50% 50%, 50% 50%",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundPosition: "100% 0%, 0% 100%",
      }}
    >
      {/* Navbar: Common for all routes */}
      <div className="flex-grow p-4">
        <TopNav />
      </div>

      {/* Main content area */}
      <div className="flex-grow p-4">
        <Outlet /> {/* This is where the routed content will be displayed */}
      </div>
      <Chatbot />
    </div>
  );
};

export default Layout;

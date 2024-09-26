import { Box } from "@chakra-ui/react";

import style from "./Page.module.css";

export function Page({ children, className }) {
  return (
    <Box className={`${style.pageWrapper} ${className}`} p={"1rem 1.5rem"}>
      <div>{children}</div>
    </Box>
  );
}

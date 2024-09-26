import { useContext, Suspense } from "react";
import { Box, Spinner } from "@chakra-ui/react";

import { UserContext } from "../../interfaces";
import PageNotFound from "../../pages/PageNotFound";

export function RolesAuth({ children, roles = [], flags = [] }) {
  const { user } = useContext(UserContext);

  let userRoleAllowed = true;
  if (roles.length > 0) {
    userRoleAllowed = user?.["user/roles"].some((userRole) =>
      roles.includes(userRole)
    );
  }

  let flagAllowed = true;
  if (flags.length > 0) {
    flagAllowed = flags.some((flag) => flag);
  }

  if (!user?.email) {
    return (
      <Box display="flex" justifyContent="center" my={"10em"}>
        <Spinner />
      </Box>
    );
  }

  if (userRoleAllowed && flagAllowed) {
    return <Suspense>{children}</Suspense>;
  }

  return <PageNotFound code={"403"} />;
}

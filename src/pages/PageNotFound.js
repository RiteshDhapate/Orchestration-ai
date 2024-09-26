import { Box, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { Page }from "../interfaces";

function PageNotFound({ code = 404}) {

	return (
		<Page>
			<Box display="flex" flexDirection="column" alignItems="center">
				<div>
					<Heading>
						{code}{" - "}
						{code === "404" && "Page Not Found"}
						{code === "403" && "No Permissions"}
					</Heading>
					<Text py={5}>
						You may have the wrong URL or wrong permissions to view this page.
					</Text>
					<ul style={{paddingInlineStart: "20px"}}>
						<li><Text><Link to="/app">Return to Dashboard</Link></Text></li>
						<li><Text><Link to="/app/login">Login</Link></Text></li>
						<li><Text><Link to="/app/logout">Logout</Link></Text></li>
					</ul>
				</div>
			</Box>
		</Page>
	);
}

export default PageNotFound;

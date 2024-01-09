import PropTypes from "prop-types";
import { Container } from "@mui/material";

import Navbar from "./Navbar";

const Layout = ({ maxWidth = "lg", containerStyles, children }) => {
	return (
		<>
			<Navbar maxWidth={maxWidth} containerStyles={containerStyles} />
			<Container
				maxWidth={maxWidth}
				sx={{ height: "100vh", pt: "71.5px", ...containerStyles }}
			>
				{children}
			</Container>
		</>
	);
};

Layout.propTypes = {
	maxWidth: PropTypes.oneOf(["xs", "xl", "sm", "md", "lg"]),
	containerStyles: PropTypes.object,
	children: PropTypes.node.isRequired,
};

export default Layout;

import PropTypes from "prop-types";
import { Container } from "@mui/material";

import Navbar from "./Navbar";

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			<Container sx={{ pt: "71.5px" }}>{children}</Container>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;

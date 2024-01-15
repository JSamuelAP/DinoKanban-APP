import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import { Layout } from "../components/";

const Error404 = () => {
	const [isAuth, setIsAuth] = useState(false);

	return (
		<>
			<Layout>
				<Typography component="h1" textAlign="center" mt={8}>
					<Typography
						component="span"
						fontWeight={700}
						fontSize="12rem"
						lineHeight={1}
						color="primary"
						display="block"
					>
						404
					</Typography>
					<Typography component="span" variant="h5" display="block">
						The page you are looking for cannot be found
					</Typography>
				</Typography>
				<Box textAlign="center" mt={8}>
					<Button
						LinkComponent={RouterLink}
						to={isAuth ? "/boards" : "/"}
						variant="contained"
						size="large"
					>
						{isAuth ? "Go Boards page" : "Go Home page"}
					</Button>
				</Box>
			</Layout>
		</>
	);
};

export default Error404;

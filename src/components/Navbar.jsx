import { useState } from "react";
import {
	AppBar,
	Box,
	Container,
	IconButton,
	Link,
	Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";

import logo from "../assets/DinoKanban logo horizontal x64.png";
import NavbarDrawer from "./NavbarDrawer";
import AccountMenu from "./AccountMenu";
import useDrawer from "../hooks/useDrawer";
import { showOnDesktop, showOnMobile } from "../helpers/mediaQueries";

const Navbar = () => {
	const [isAuth] = useState(true);
	const [mobileOpen, handleDrawerToggle] = useDrawer();

	return (
		<>
			<AppBar component="nav" color="default">
				<Container>
					<Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
						<Link to="/" component={RouterLink}>
							<Box component="img" src={logo} alt="DinoKanban logo" />
						</Link>
						<Box sx={showOnDesktop}>
							{isAuth ? (
								<>
									<Link
										to="/boards"
										component={RouterLink}
										underline="none"
										color="MenuText"
										mr={2}
									>
										Boards
									</Link>
									<AccountMenu />
								</>
							) : (
								<>
									<Link
										to="/login"
										component={RouterLink}
										underline="none"
										color="MenuText"
										mr={2}
									>
										Login
									</Link>
									<Link
										to="/signup"
										component={RouterLink}
										underline="none"
										color="MenuText"
									>
										Signup
									</Link>
								</>
							)}
						</Box>
						<Box sx={showOnMobile}>
							<IconButton
								size="large"
								aria-label="open drawer"
								onClick={handleDrawerToggle}
							>
								<MenuIcon />
							</IconButton>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<NavbarDrawer open={mobileOpen} handleToggle={handleDrawerToggle} />
		</>
	);
};

export default Navbar;

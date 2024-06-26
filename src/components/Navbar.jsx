import PropTypes from "prop-types";
import {
	AppBar,
	Box,
	Container,
	IconButton,
	Link,
	Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import useAuthStore from "../store/authStore";
import { logout } from "../services/authServices.js";
import logo from "../assets/DinoKanban logo horizontal x64.png";
import NavbarDrawer from "./NavbarDrawer";
import AccountMenu from "./AccountMenu";
import useDrawer from "../hooks/useDrawer";
import { showOnDesktop, showOnMobile } from "../helpers/mediaQueries";

const Navbar = ({ maxWidth, containerStyles }) => {
	const { isAuth, closeSession } = useAuthStore();
	const [mobileOpen, handleDrawerToggle] = useDrawer();
	const navigate = useNavigate();

	const { mutate: handleLogout } = useMutation({
		mutationFn: logout,
		onSuccess: () => {
			closeSession();
			localStorage.removeItem("user");
			navigate("/login");
		},
	});

	return (
		<>
			<AppBar component="nav" color="default">
				<Container maxWidth={maxWidth} sx={containerStyles}>
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
									<AccountMenu handleLogout={handleLogout} />
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
			<NavbarDrawer
				open={mobileOpen}
				handleToggle={handleDrawerToggle}
				handleLogout={handleLogout}
			/>
		</>
	);
};

Navbar.propTypes = {
	maxWidth: PropTypes.oneOf(["xs", "xl", "sm", "md", "lg"]),
	containerStyles: PropTypes.object,
};

export default Navbar;

import {
	Divider,
	IconButton,
	Link,
	ListItemIcon,
	Menu,
	MenuItem,
	Typography,
} from "@mui/material";
import AccountIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as RouterLink } from "react-router-dom";

import ProfileBox from "./ProfileBox";
import useAccountMenu from "../hooks/useAccountMenu";
import { showOnDesktop } from "../helpers/mediaQueries";

const AccountMenu = () => {
	const [anchorEl, handleClick, handleClose] = useAccountMenu();

	return (
		<>
			<IconButton
				onClick={handleClick}
				size="small"
				aria-label="account of current user"
				aria-controls={anchorEl ? "account-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={anchorEl ? "true" : undefined}
				color="primary"
			>
				<AccountIcon fontSize="large" />
			</IconButton>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							"&::before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0,
							},
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				sx={showOnDesktop}
			>
				<Link
					to="/profile"
					component={RouterLink}
					underline="none"
					color="MenuText"
				>
					<MenuItem
						sx={{
							flexDirection: "column",
							alignItems: "start",
						}}
					>
						<Typography>Your profile</Typography>
						<ProfileBox minWidth={125} maxWidth={175} />
					</MenuItem>
				</Link>
				<Divider />
				<Link
					to="/logout"
					component={RouterLink}
					underline="none"
					color="MenuText"
				>
					<MenuItem>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						Logout
					</MenuItem>
				</Link>
			</Menu>
		</>
	);
};

export default AccountMenu;

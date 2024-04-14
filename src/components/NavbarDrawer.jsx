import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import {
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
	Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import SignupIcon from "@mui/icons-material/PersonAdd";
import BoardIcon from "@mui/icons-material/ViewKanban";
import FavoriteIcon from "@mui/icons-material/Star";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

import useAuthStore from "../store/authStore";
import useBoardsStore from "../store/boardsStore";
import useApiPrivate from "../hooks/useApiPrivate";
import { getBoards } from "../services/boardsServices";
import ProfileBox from "./ProfileBox";
import { showOnMobile } from "../helpers/mediaQueries";
import CreateBoardForm from "./CreateBoardForm";

const StyledDivider = styled(Divider)({
	margin: "16px 0",
});

const BoardsNav = styled(List)({
	"& .MuiListItemIcon-root": {
		minWidth: 0,
	},
});

const NavbarDrawer = ({ open, handleToggle, handleLogout }) => {
	const api = useApiPrivate();
	const { isAuth } = useAuthStore();
	const { isFavorite } = useBoardsStore();
	const navigate = useNavigate();

	const { data, isSuccess } = useQuery({
		queryKey: ["boards"],
		queryFn: () => getBoards(api),
		retry: 0,
	});

	const boards = isSuccess
		? data.map((board) => {
				board.favorite = isFavorite(board._id);
				return board;
				// eslint-disable-next-line no-mixed-spaces-and-tabs
		  })
		: [];

	return (
		<nav>
			<SwipeableDrawer
				variant="temporary"
				ModalProps={{ keepMounted: true }}
				open={open}
				onOpen={handleToggle}
				onClose={handleToggle}
				sx={showOnMobile}
			>
				<Box sx={{ width: 300, height: "100%" }}>
					<List sx={{ height: "100%" }}>
						{isAuth && (
							<>
								<ListItem disablePadding>
									<ListItemButton component={RouterLink} to="/profile">
										<ProfileBox maxWidth={200} />
									</ListItemButton>
								</ListItem>
								<StyledDivider />
								<ListItem disablePadding>
									<ListItemButton component={RouterLink} to="/boards">
										<ListItemIcon>
											<BoardIcon color="primary" fontSize="large" />
										</ListItemIcon>
										<ListItemText primary="Boards" />
									</ListItemButton>
								</ListItem>
								<StyledDivider />
								<ListItem sx={{ pb: 0 }}>
									<Typography component="h2" variant="h6">
										Your boards
									</Typography>
								</ListItem>
								<BoardsNav dense>
									{isSuccess &&
										boards.map((board) => (
											<ListItem key={board._id} disablePadding>
												<ListItemButton
													component={RouterLink}
													to={`/boards/${board.id}`}
												>
													<ListItemIcon sx={{ mr: 1 }}>
														<BoardIcon color="primary" />
													</ListItemIcon>
													<Typography component="span" noWrap width={214}>
														{board.name}
													</Typography>
													{board.favorite && (
														<ListItemIcon>
															<FavoriteIcon sx={{ color: amber[500] }} />
														</ListItemIcon>
													)}
												</ListItemButton>
											</ListItem>
										))}
									<ListItem disablePadding>
										<CreateBoardForm variant="list-item" navigate={navigate} />
									</ListItem>
								</BoardsNav>
								<StyledDivider />
								<ListItem
									disablePadding
									sx={{ position: "absolute", bottom: 8 }}
								>
									<ListItemButton onClick={handleLogout}>
										<ListItemIcon>
											<LogoutIcon />
										</ListItemIcon>
										<ListItemText primary="Logout" />
									</ListItemButton>
								</ListItem>
							</>
						)}
						{!isAuth && (
							<>
								<ListItem disablePadding>
									<ListItemButton component={RouterLink} to="/login">
										<ListItemIcon>
											<LoginIcon />
										</ListItemIcon>
										<ListItemText primary="Login" />
									</ListItemButton>
								</ListItem>
								<ListItem disablePadding>
									<ListItemButton component={RouterLink} to="/signup">
										<ListItemIcon>
											<SignupIcon />
										</ListItemIcon>
										<ListItemText primary="Signup" />
									</ListItemButton>
								</ListItem>
							</>
						)}
					</List>
				</Box>
			</SwipeableDrawer>
		</nav>
	);
};

NavbarDrawer.propTypes = {
	open: PropTypes.bool.isRequired,
	handleToggle: PropTypes.func.isRequired,
	handleLogout: PropTypes.func.isRequired,
};

export default NavbarDrawer;

import PropTypes from "prop-types";
import {
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	MenuList,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddFavIcon from "@mui/icons-material/Star";
import RemoveFavIcon from "@mui/icons-material/StarBorder";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { red, blue, amber } from "@mui/material/colors";
import useMenu from "../hooks/useMenu.js";

const CardBoardMenu = ({ id, favorite }) => {
	const [anchorEl, handleClick, handleClose] = useMenu();

	return (
		<>
			<IconButton
				id={`button-options-${id}`}
				aria-controls={anchorEl ? `menu-options-${id}` : undefined}
				aria-haspopup="true"
				aria-expanded={anchorEl ? "true" : undefined}
				aria-label="options"
				onClick={(e) => {
					e.preventDefault();
					handleClick(e);
				}}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id={`menu-options-${id}`}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				MenuListProps={{ "aria-labelledby": `button-options-${id}` }}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<MenuList dense>
					{favorite ? (
						<MenuItem>
							<ListItemIcon>
								<RemoveFavIcon sx={{ color: amber[500] }} />
							</ListItemIcon>
							<ListItemText>Remove from favorites</ListItemText>
						</MenuItem>
					) : (
						<MenuItem>
							<ListItemIcon>
								<AddFavIcon sx={{ color: amber[500] }} />
							</ListItemIcon>
							<ListItemText>Add to favorites</ListItemText>
						</MenuItem>
					)}
					<MenuItem>
						<ListItemIcon>
							<EditIcon sx={{ color: blue[500] }} />
						</ListItemIcon>
						<ListItemText>Edit board</ListItemText>
					</MenuItem>
					<MenuItem>
						<ListItemIcon>
							<DeleteIcon sx={{ color: red[500] }} />
						</ListItemIcon>
						<ListItemText>Delete board</ListItemText>
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
};

CardBoardMenu.propTypes = {
	id: PropTypes.string.isRequired,
	favorite: PropTypes.bool.isRequired,
};

export default CardBoardMenu;

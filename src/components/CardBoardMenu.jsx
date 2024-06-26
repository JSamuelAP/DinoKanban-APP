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
import useDialog from "../hooks/useDialog";
import ConfirmDeleteBoard from "./ConfirmDeleteBoard.jsx";
import useBoardsStore from "../store/boardsStore.js";

const CardBoardMenu = ({ board, handleEdit }) => {
	const { _id, favorite } = board;
	const [anchorEl, handleClick, handleClose] = useMenu();
	const { addFavorite, removeFavorite } = useBoardsStore();
	const [openDialog, handleOpenDialog, handleCloseDialog] = useDialog(() => {
		removeFavorite(_id);
		handleClose();
	});

	return (
		<>
			<IconButton
				id={`button-options-${_id}`}
				aria-controls={anchorEl ? `menu-options-${_id}` : undefined}
				aria-haspopup="true"
				aria-expanded={anchorEl ? "true" : undefined}
				aria-label="options"
				onClick={(e) => {
					e.stopPropagation();
					handleClick(e);
				}}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id={`menu-options-${_id}`}
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorOrigin={{ vertical: "top", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				MenuListProps={{ "aria-labelledby": `button-options-${_id}` }}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<MenuList dense>
					{favorite ? (
						<MenuItem
							role="button"
							onClick={() => {
								removeFavorite(board._id);
							}}
						>
							<ListItemIcon>
								<RemoveFavIcon sx={{ color: amber[500] }} />
							</ListItemIcon>
							<ListItemText>Remove from favorites</ListItemText>
						</MenuItem>
					) : (
						<MenuItem
							role="button"
							onClick={() => {
								addFavorite(board._id);
							}}
						>
							<ListItemIcon>
								<AddFavIcon sx={{ color: amber[500] }} />
							</ListItemIcon>
							<ListItemText>Add to favorites</ListItemText>
						</MenuItem>
					)}
					<MenuItem
						role="button"
						onClick={() => {
							handleEdit();
							handleClose();
						}}
					>
						<ListItemIcon>
							<EditIcon sx={{ color: blue[500] }} />
						</ListItemIcon>
						<ListItemText>Edit board</ListItemText>
					</MenuItem>
					<MenuItem role="button" onClick={handleOpenDialog}>
						<ListItemIcon>
							<DeleteIcon sx={{ color: red[500] }} />
						</ListItemIcon>
						<ListItemText>Delete board</ListItemText>
					</MenuItem>
				</MenuList>
			</Menu>
			<ConfirmDeleteBoard
				board={board}
				open={openDialog}
				handleClose={handleCloseDialog}
			/>
		</>
	);
};

CardBoardMenu.propTypes = {
	board: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		favorite: PropTypes.bool.isRequired,
	}),
	handleEdit: PropTypes.func.isRequired,
};

export default CardBoardMenu;

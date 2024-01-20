import PropTypes from "prop-types";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfirmDeleteBoard = ({ board, open, handleClose }) => {
	const navigate = useNavigate();

	const handleDelete = () => {
		console.log("Deleting board ", board._id);
		navigate("/boards/");
		handleClose();
	};

	return (
		<>
			<Dialog
				open={open}
				onClose={(e) => {
					e.stopPropagation();
					handleClose();
				}}
				aria-labelledby="dialog-title"
			>
				<DialogTitle id="dialog-title">Delete board</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete the board &apos;{board.name}&apos;?,
						Its tasks will also be deleted and you will not be able to recover
						it.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={(e) => {
							e.stopPropagation();
							handleClose();
						}}
					>
						Cancel
					</Button>
					<Button
						onClick={(e) => {
							e.stopPropagation();
							handleDelete();
						}}
						variant="contained"
						color="error"
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

ConfirmDeleteBoard.propTypes = {
	board: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default ConfirmDeleteBoard;

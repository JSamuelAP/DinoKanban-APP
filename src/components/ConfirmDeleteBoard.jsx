import PropTypes from "prop-types";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import useApiPrivate from "../hooks/useApiPrivate.js";
import { deleteBoard } from "../services/boardsServices.js";

const ConfirmDeleteBoard = ({ board, open, handleClose }) => {
	const api = useApiPrivate();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const location = useLocation();

	const { mutate: delBoard } = useMutation({
		mutationFn: () => deleteBoard(api, board._id),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ["boards"] });
			const previousData = queryClient.getQueryData(["boards"]);

			await queryClient.setQueryData(["boards"], (oldBoards) => {
				if (oldBoards == null) return [];
				return oldBoards.filter((b) => b._id !== board._id);
			});

			if (location.pathname !== "/boards") navigate("/boards");
			return { previousData };
		},
		onError: (error, variables, context) => {
			if (context.previousData != null)
				queryClient.setQueriesData(["board"], context.previousData);
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ["boards"] });
		},
	});

	const handleDelete = () => {
		delBoard();
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
				onClick={(e) => e.stopPropagation()}
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

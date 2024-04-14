import PropTypes from "prop-types";
import {
	Alert,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Fab,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import useDialog from "../hooks/useDialog";
import useApiPrivate from "../hooks/useApiPrivate.js";
import { createBoard } from "../services/boardsServices";

const CreateBoardForm = ({ navigate, variant = "fab" }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [open, handleOpen, handleClose] = useDialog(reset);
	const api = useApiPrivate();

	const {
		mutate: postBoard,
		isError,
		error,
	} = useMutation({
		mutationFn: (data) => createBoard(api, data),
		onSuccess: async (data) => {
			navigate("/boards/" + data.data.board._id);
		},
	});

	const onSubmit = handleSubmit((data) => {
		postBoard(data);
		handleClose();
	});

	return (
		<>
			{variant === "fab" && (
				<Fab color="primary" aria-label="add" onClick={handleOpen}>
					<AddIcon />
				</Fab>
			)}
			{variant === "list-item" && (
				<ListItemButton onClick={handleOpen}>
					<ListItemIcon sx={{ mr: 1 }}>
						<AddIcon />
					</ListItemIcon>
					<ListItemText
						primary="Create new"
						primaryTypographyProps={{ color: "GrayText" }}
					/>
				</ListItemButton>
			)}
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{ component: "form", onSubmit: onSubmit }}
				aria-labelledby="dialog-title"
			>
				<DialogTitle id="dialog-title">Create new board</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						{...register("name", {
							required: "Name is required",
							maxLength: {
								value: 32,
								message: "Max length for board name is 32 characters",
							},
						})}
						label="Name"
						error={!!errors.name}
						helperText={errors.name?.message}
						variant="standard"
						fullWidth
					/>
					{isError && (
						<Alert severity="error" sx={{ mt: 2 }}>
							{error?.response?.data?.message || "Could not create the board"}
						</Alert>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit" variant="contained">
						Create
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

CreateBoardForm.propTypes = {
	navigate: PropTypes.func.isRequired,
	variant: PropTypes.oneOf(["fab", "list-item"]),
};

export default CreateBoardForm;

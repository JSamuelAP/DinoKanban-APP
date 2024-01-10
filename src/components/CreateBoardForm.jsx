import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Fab,
	TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import useDialog from "../hooks/useDialog";

const CreateBoardForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [open, handleOpen, handleClose] = useDialog(reset);

	const onSubmit = handleSubmit((data) => {
		console.log(data);
		handleClose();
	});

	return (
		<>
			<Fab color="primary" aria-label="add" onClick={handleOpen}>
				<AddIcon />
			</Fab>
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

export default CreateBoardForm;

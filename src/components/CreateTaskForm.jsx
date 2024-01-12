import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import useDialog from "../hooks/useDialog";

const CreateTaskForm = ({ list, board }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const [open, handleOpen, handleClose] = useDialog(reset);

	const onSubmit = handleSubmit((data) => {
		data.board = board;
		data.list = list;

		if (!data.description) delete data.description;

		console.log(data);
		handleClose();
	});

	return (
		<>
			<Button onClick={handleOpen} startIcon={<AddIcon />} fullWidth>
				Add task
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{ component: "form", onSubmit }}
				aria-labelledby="dialog-title"
				maxWidth="xs"
				fullWidth
			>
				<DialogTitle id="dialog-title">
					Create new task in {list} list
				</DialogTitle>
				<DialogContent>
					<Stack spacing={2}>
						<TextField
							autoFocus
							{...register("title", {
								required: "Title is required",
								maxLength: {
									value: 24,
									message: "Max length for task name is 24 characters",
								},
							})}
							label="Title"
							error={!!errors.title}
							helperText={errors.title?.message}
							variant="standard"
							fullWidth
						/>
						<TextField
							{...register("description", {
								maxLength: {
									value: 200,
									message: "Max length for task description is 200 characters",
								},
							})}
							label="Description"
							error={!!errors.description}
							helperText={errors.description?.message}
							variant="standard"
							multiline
							minRows={3}
							fullWidth
						/>
					</Stack>
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

CreateTaskForm.propTypes = {
	list: PropTypes.oneOf(["backlog", "todo", "doing", "done"]),
	board: PropTypes.string.isRequired,
};

export default CreateTaskForm;
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import dayjs from "../helpers/dayjs.js";
import { useState } from "react";
import UpdateTaskForm from "./UpdateTaskForm.jsx";

const TaskDialog = ({ task, open, handleClose }) => {
	const [editMode, setEditMode] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const handleCloseForm = () => {
		setEditMode(false);
		reset();
	};

	const handleCloseAll = () => {
		handleClose();
		handleCloseForm();
	};

	const onSubmit = handleSubmit((data) => {
		if (!data.description) delete data.description;
		console.log(data);
		handleCloseAll();
	});

	return (
		<>
			<Dialog
				open={open}
				onClose={handleCloseAll}
				PaperProps={{ component: "form", onSubmit }}
				aria-labelledby="dialog-title"
				maxWidth="xs"
				fullWidth
			>
				<DialogTitle id="dialog-title" sx={{ pr: 6, pb: 0 }}>
					{`${editMode ? "Update" : ""} ${task.title}`}
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleCloseAll}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
				{!editMode ? (
					<>
						<DialogContent sx={{ pt: 0 }}>
							<Typography variant="body2" color={"GrayText"} mb={2}>
								On the {task.list} list
							</Typography>
							<Typography
								component="time"
								dateTime={dayjs(task.createdAt).format("YYYY-MM-DD")}
								variant="body2"
								color="GrayText"
								display="inline-block"
							>
								<CalendarIcon
									fontSize="small"
									sx={{ verticalAlign: "top", mr: 0.5 }}
								/>
								Created at {dayjs(task.createdAt).format("dddd, MMMM DD, YYYY")}
							</Typography>
							<Typography
								component="time"
								dateTime={dayjs(task.createdAt).format("YYYY-MM-DD")}
								variant="body2"
								color="GrayText"
								display="inline-block"
								mb={2}
							>
								<CalendarIcon
									fontSize="small"
									sx={{ verticalAlign: "top", mr: 0.5 }}
								/>
								Last update at{" "}
								{dayjs(task.updatedAt).format("dddd, MMMM DD, YYYY")}
							</Typography>
							{task.description && <Typography>{task.description}</Typography>}
						</DialogContent>
						<DialogActions>
							<Button
								onClick={handleClose}
								color="error"
								startIcon={<DeleteIcon />}
								variant="contained"
							>
								Delete
							</Button>
							<Button
								onClick={() => setEditMode(true)}
								color="info"
								startIcon={<EditIcon />}
								variant="contained"
							>
								Edit
							</Button>
						</DialogActions>
					</>
				) : (
					<UpdateTaskForm
						task={task}
						closeEditMode={handleCloseForm}
						register={register}
						errors={errors}
					/>
				)}
			</Dialog>
		</>
	);
};

TaskDialog.propTypes = {
	task: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		list: PropTypes.oneOf(["backlog", "todo", "doing", "done"]),
		createdAt: PropTypes.string.isRequired,
		updatedAt: PropTypes.string.isRequired,
	}),
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default TaskDialog;

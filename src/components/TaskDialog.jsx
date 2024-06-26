import PropTypes from "prop-types";
import { useState } from "react";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useApiPrivate from "../hooks/useApiPrivate.js";
import { updateTask, deleteTask } from "../services/tasksServices.js";
import UpdateTaskForm from "./UpdateTaskForm.jsx";
import dayjs from "../helpers/dayjs.js";

const TaskDialog = ({ task, open, handleClose }) => {
	const [editMode, setEditMode] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const api = useApiPrivate();
	const queryClient = useQueryClient();

	const handleCloseForm = () => {
		setEditMode(false);
		reset();
	};

	const handleCloseAll = () => {
		handleClose();
		handleCloseForm();
	};

	const {
		mutate: editTask,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: (data) => updateTask(api, data.id, data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["tasks", "board", task.board],
			});
			handleCloseAll();
		},
	});

	const { mutate: dropTask, isPending: isDeleting } = useMutation({
		mutationFn: (data) => deleteTask(api, data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["tasks", "board", task.board],
			});
			handleCloseAll();
		},
	});

	const onSubmit = handleSubmit((data) => {
		data.id = task._id;
		if (!data.description) delete data.description;
		editTask(data);
	});

	const handleDelete = () => dropTask(task._id);

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
								On the {task.status} status
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
								onClick={handleDelete}
								color="error"
								startIcon={<DeleteIcon />}
								variant="contained"
								disabled={isDeleting}
							>
								Delete
							</Button>
							<Button
								onClick={() => setEditMode(true)}
								color="info"
								startIcon={<EditIcon />}
								variant="contained"
								disabled={isDeleting}
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
						isLoading={isPending}
						isError={isError}
						error={error}
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
		board: PropTypes.string.isRequired,
		status: PropTypes.oneOf(["backlog", "todo", "doing", "done"]),
		createdAt: PropTypes.string.isRequired,
		updatedAt: PropTypes.string.isRequired,
	}),
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default TaskDialog;

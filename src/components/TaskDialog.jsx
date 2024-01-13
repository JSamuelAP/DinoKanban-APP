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

const TaskDialog = ({ task, open, handleClose }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = handleSubmit((data) => {
		console.log(data);
		handleClose();
	});

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{ component: "form", onSubmit }}
				aria-labelledby="dialog-title"
				maxWidth="xs"
				fullWidth
			>
				<DialogTitle id="dialog-title" sx={{ pr: 6, pb: 0 }}>
					{task.title}
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
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
						Last update at {dayjs(task.updatedAt).format("dddd, MMMM DD, YYYY")}
					</Typography>
					{task.description && <Typography>{task.description}</Typography>}
				</DialogContent>
				<DialogActions>
					<Button color="error" startIcon={<DeleteIcon />} variant="contained">
						Delete
					</Button>
					<Button color="info" startIcon={<EditIcon />} variant="contained">
						Edit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

TaskDialog.propTypes = {
	task: PropTypes.shape({
		id: PropTypes.string.isRequired,
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

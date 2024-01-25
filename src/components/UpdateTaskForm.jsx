import PropTypes from "prop-types";
import {
	Alert,
	Button,
	DialogActions,
	DialogContent,
	MenuItem,
	Stack,
	TextField,
} from "@mui/material";

const UpdateTaskForm = ({
	task,
	closeEditMode,
	register,
	errors,
	isLoading,
	isError,
	error,
}) => {
	return (
		<>
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
						defaultValue={task.title}
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
						defaultValue={task.description}
						error={!!errors.description}
						helperText={errors.description?.message}
						variant="standard"
						multiline
						minRows={3}
						fullWidth
					/>
					<TextField
						select
						{...register("list")}
						label="List"
						defaultValue={task.list}
						error={!!errors.description}
						helperText={errors.description?.message}
						variant="standard"
						fullWidth
					>
						<MenuItem value="backlog">💡 Backlog</MenuItem>
						<MenuItem value="todo">⏰ Todo</MenuItem>
						<MenuItem value="doing">🏗️ Doing</MenuItem>
						<MenuItem value="done">✅ Done</MenuItem>
					</TextField>
					{isError && (
						<Alert severity="error">
							{error?.response?.data?.message || "Could not update the task"}
						</Alert>
					)}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={closeEditMode} disabled={isLoading}>
					Cancel
				</Button>
				<Button type="submit" variant="contained" disabled={isLoading}>
					Update
				</Button>
			</DialogActions>
		</>
	);
};

UpdateTaskForm.propTypes = {
	task: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string,
		list: PropTypes.oneOf(["backlog", "todo", "doing", "done"]),
	}).isRequired,
	closeEditMode: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	errors: PropTypes.object.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isError: PropTypes.bool.isRequired,
	error: PropTypes.object,
};

export default UpdateTaskForm;

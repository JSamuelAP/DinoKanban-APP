import PropTypes from "prop-types";
import { Box, styled } from "@mui/material";

import useDialog from "../hooks/useDialog.js";
import TaskDialog from "./TaskDialog.jsx";
import { Draggable } from "react-beautiful-dnd";

const StyledButton = styled(Box)(({ theme, isDragging }) => ({
	fontWeight: 400,
	backgroundColor: theme.palette.background.paper,
	borderWidth: isDragging ? 2 : 1,
	borderStyle: "solid",
	borderColor: isDragging ? theme.palette.primary.main : theme.palette.divider,
	borderRadius: theme.shape.borderRadius,
	padding: theme.spacing(2),
}));

const CardTask = ({ task }) => {
	const [open, handleOpen, handleClose] = useDialog();

	return (
		<>
			<Draggable draggableId={task._id} index={task.order}>
				{(provided, snapshot) => (
					<StyledButton
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						isDragging={snapshot.isDragging}
						aria-roledescription="Press space bar to lift the task"
						onClick={handleOpen}
					>
						{task.title}
					</StyledButton>
				)}
			</Draggable>
			<TaskDialog task={task} open={open} handleClose={handleClose} />
		</>
	);
};

CardTask.propTypes = {
	task: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		order: PropTypes.number.isRequired,
	}),
};

export default CardTask;

import PropTypes from "prop-types";
import { Button, styled } from "@mui/material";

import useDialog from "../hooks/useDialog.js";
import TaskDialog from "./TaskDialog.jsx";

const StyledButton = styled(Button)({
	display: "block",
	textAlign: "left",
	textTransform: "none",
	fontWeight: 400,
	color: "ButtonText",
	border: "1px solid rgba(0,0,0,0.12)",
	padding: "1rem",
});

const CardTask = ({ task }) => {
	const [open, handleOpen, handleClose] = useDialog();

	return (
		<>
			<StyledButton onClick={handleOpen}>{task.title}</StyledButton>
			<TaskDialog task={task} open={open} handleClose={handleClose} />
		</>
	);
};

CardTask.propTypes = {
	task: PropTypes.shape({
		id: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}),
};

export default CardTask;

import PropTypes from "prop-types";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)({
	display: "block",
	textAlign: "left",
	textTransform: "none",
	fontWeight: 400,
	color: "ButtonText",
	border: "1px solid rgba(0,0,0,0.12)",
	padding: "1rem",
});

const CardTask = ({ task: { id, title } }) => {
	return (
		<>
			<StyledButton>{title}</StyledButton>
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

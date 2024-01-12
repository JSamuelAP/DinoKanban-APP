import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { TextField, styled } from "@mui/material";

const InputCardBoard = styled(TextField)({
	".MuiInputBase-input": {
		padding: "0 .5rem",
		fontSize: "0.875rem",
		fontWeight: 500,
	},
});

const InputBoardPage = styled(TextField)({
	".MuiInputBase-input": {
		height: "unset",
		padding: "0 .5rem",
		fontSize: "2.125rem",
	},
});

const EditableText = ({
	textNode,
	isEditMode,
	board,
	handleBlur,
	variant = "card-board",
}) => {
	const [text, setText] = useState(board.name);
	const inputRef = useRef(null);

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, [isEditMode]);

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleCancel = () => {
		setText(board.name);
		handleBlur();
	};

	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			handleCancel();
			return;
		}

		if (e.key !== "Enter") return;

		if (!text.trim() || text.length > 32) {
			handleCancel();
			return;
		}

		console.log(`Updating board ${board.id}: ${board.name} -> ${text}`);
		handleBlur();
	};

	const CustomInput =
		variant === "card-board" ? InputCardBoard : InputBoardPage;

	return (
		<>
			{!isEditMode ? (
				textNode
			) : (
				<CustomInput
					inputRef={inputRef}
					value={text}
					onChange={handleChange}
					onKeyDown={handleKeyDown}
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
					}}
					onBlur={handleBlur}
					fullWidth
				/>
			)}
		</>
	);
};

EditableText.propTypes = {
	textNode: PropTypes.node.isRequired,
	isEditMode: PropTypes.bool.isRequired,
	board: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	handleBlur: PropTypes.func.isRequired,
	variant: PropTypes.oneOf(["card-board", "board-page"]),
};

export default EditableText;

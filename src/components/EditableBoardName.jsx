import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { TextField, Typography, styled } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import useApiPrivate from "../hooks/useApiPrivate";
import { updateBoard } from "../services/boardsServices";

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

const EditableBoardName = ({
	isEditMode,
	board,
	handleBlur,
	variant = "card-board",
}) => {
	const [name, setName] = useState(board.name);
	const inputRef = useRef(null);
	const api = useApiPrivate();
	const queryClient = useQueryClient();

	const { mutate: putBoard } = useMutation({
		mutationFn: (data) => updateBoard(api, board._id, data),
		onMutate: async (data) => {
			const previousData = queryClient.getQueryData(["boards"]);
			setName(data.name);
			board.name = name;
			return { previousData };
		},
		onError: (error, variables, context) => {
			if (context.previousData != null)
				queryClient.setQueriesData(["board"], context.previousData);
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ["boards"] });
		},
	});

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	}, [isEditMode]);

	const handleChange = (e) => {
		setName(e.target.value);
	};

	const handleCancel = () => {
		setName(board.name);
		handleBlur();
	};

	const handleKeyDown = (e) => {
		if (e.key === "Escape") {
			handleCancel();
			return;
		}

		if (e.key !== "Enter") return;

		if (!name.trim() || name.length > 32 || name === board.name) {
			handleCancel();
			return;
		}

		putBoard({ name });
		handleBlur();
	};

	const CustomInput =
		variant === "card-board" ? InputCardBoard : InputBoardPage;

	return (
		<>
			{!isEditMode ? (
				variant === "card-board" ? (
					<span>{board.name}</span>
				) : (
					<Typography component="h1" variant="h4">
						{board.name}
					</Typography>
				)
			) : (
				<CustomInput
					inputRef={inputRef}
					value={name}
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

EditableBoardName.propTypes = {
	isEditMode: PropTypes.bool.isRequired,
	board: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
	}).isRequired,
	handleBlur: PropTypes.func.isRequired,
	variant: PropTypes.oneOf(["card-board", "board-page"]),
};

export default EditableBoardName;

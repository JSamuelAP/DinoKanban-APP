import { useState } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import { useParams } from "react-router-dom";

import { Layout, CardBoardMenu, BoardList, EditableText } from "../components/";
import dayjs from "../helpers/dayjs.js";

const board = {
	id: "1",
	name: "Board name",
	createdAt: "2024-01-01T19:15:00.782Z",
	updatedAt: "2024-01-04T19:15:00.782Z",
	favorite: true,
};

const tasks = {
	backlog: [
		{
			id: "1",
			title: "Task 1",
			description:
				"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente delectus aspernatur ea voluptates! Eveniet earum blanditiis mollitia magni iusto, impedit temporibus at nam modi, ullam quo! Culpa.",
			list: "backlog",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
		{
			id: "2",
			title: "Task 2",
			description: "",
			list: "backlog",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
		{
			id: "3",
			title: "Task 3",
			description: "",
			list: "backlog",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
	],
	todo: [
		{
			id: "4",
			title: "Task 4",
			description: "",
			list: "todo",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
		{
			id: "5",
			title: "Task 5",
			description: "",
			list: "todo",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
		{
			id: "6",
			title: "Task 6",
			description: "",
			list: "todo",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
	],
	doing: [
		{
			id: "7",
			title: "Task 7",
			description: "",
			list: "doing",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
		{
			id: "8",
			title: "Task 8",
			description: "",
			list: "doing",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
		{
			id: "9",
			title: "Task 9",
			description: "",
			list: "doing",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
	],
	done: [
		{
			id: "11",
			title: "Task 11",
			description: "",
			list: "done",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
		{
			id: "12",
			title: "Task 12",
			description: "",
			list: "done",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
		{
			id: "13",
			title: "Task 13",
			description: "",
			list: "done",
			createdAt: "2024-01-01T19:15:00.782Z",
			updatedAt: "2024-01-04T19:15:00.782Z",
		},
	],
};

const Board = () => {
	const { id } = useParams();
	const [editMode, setEditMode] = useState(false);

	const lists = [
		{ name: "backlog", title: "💡 Backlog" },
		{ name: "todo", title: "⏰ Todo" },
		{ name: "doing", title: "🏗️ Doing" },
		{ name: "done", title: "✅ Done" },
	];

	return (
		<>
			<Layout>
				<Box component="main" mt={4} mb={8}>
					<Box component="section">
						<Box
							display="flex"
							justifyContent="space-between"
							alignItems="start"
						>
							<EditableText
								textNode={
									<Typography component="h1" variant="h4">
										{board.name}
									</Typography>
								}
								isEditMode={editMode}
								board={board}
								handleBlur={() => setEditMode(false)}
								variant="board-page"
							/>
							<CardBoardMenu
								board={board}
								handleEdit={() => setEditMode(true)}
							/>
						</Box>
						<Typography
							component="time"
							dateTime={dayjs(board.createdAt).format("YYYY-MM-DD")}
							variant="body2"
							color="gray"
							display="inline-block"
							mb={2}
						>
							<CalendarIcon
								fontSize="small"
								sx={{ verticalAlign: "top", mr: 0.5 }}
							/>
							Created at {dayjs(board.createdAt).format("dddd, MMMM DD, YYYY")}
						</Typography>
						<Divider />
					</Box>
					<Box component="section" mt={4}>
						<Grid container spacing={{ xs: 2, md: 3 }}>
							{lists.map(({ name, title }) => (
								<Grid item xs={12} sm={6} md={3} key={name}>
									<BoardList
										list={{ name, title, tasks: tasks[name] }}
										board={board.id}
									/>
								</Grid>
							))}
						</Grid>
					</Box>
				</Box>
			</Layout>
		</>
	);
};

export default Board;

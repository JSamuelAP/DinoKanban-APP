import { Box, Divider, Grid, Typography } from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import { useParams } from "react-router-dom";

import { Layout, CardBoardMenu, BoardList } from "../components/";
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
		{ id: "1", title: "Task 1" },
		{ id: "2", title: "Task 2" },
		{ id: "3", title: "Task 3" },
	],
	todo: [
		{ id: "4", title: "Task 4" },
		{ id: "5", title: "Task 5" },
		{ id: "6", title: "Task 6" },
	],
	doing: [
		{ id: "7", title: "Task 7" },
		{ id: "8", title: "Task 8" },
		{ id: "9", title: "Task 9" },
	],
	done: [
		{ id: "11", title: "Task 11" },
		{ id: "12", title: "Task 12" },
		{ id: "13", title: "Task 13" },
	],
};

const Board = () => {
	const { id } = useParams();

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
						<Box display="flex" justifyContent="space-between">
							<Typography component="h1" variant="h4">
								{board.name}
							</Typography>
							<CardBoardMenu board={board} />
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
									<BoardList list={{ title, tasks: tasks[name] }} />
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

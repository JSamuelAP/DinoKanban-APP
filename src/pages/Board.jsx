import { useState } from "react";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import { useQuery } from "@tanstack/react-query";
import { Link as RouterLink, useParams } from "react-router-dom";

import {
	Layout,
	CardBoardMenu,
	BoardList,
	EditableBoardName,
} from "../components/";
import useApiPrivate from "../hooks/useApiPrivate.js";
import { getBoard } from "../services/boardsServices.js";
import { getCards } from "../services/cardsServices.js";
import dayjs from "../helpers/dayjs.js";

const lists = [
	{ name: "backlog", title: "💡 Backlog" },
	{ name: "todo", title: "⏰ Todo" },
	{ name: "doing", title: "🏗️ Doing" },
	{ name: "done", title: "✅ Done" },
];

const Board = () => {
	const { id } = useParams();
	const [editMode, setEditMode] = useState(false);
	const api = useApiPrivate();

	const { data, isLoading, isSuccess, isError } = useQuery({
		queryKey: ["board", id],
		queryFn: () => getBoard(api, id),
	});
	const board = data?.data?.board || {};

	const { dataCards } = useQuery({
		queryKey: ["cards", "board", id],
		queryFn: () => getCards(api, board._id),
	});
	const tasks = dataCards?.data?.cards || {
		backlog: [],
		todo: [],
		doing: [],
		done: [],
	};

	return (
		<>
			<Layout>
				<Box component="main" mt={4} mb={8}>
					{isError && (
						<>
							<Typography component="h1" textAlign="center" mt={8}>
								<Typography
									component="span"
									fontWeight={700}
									fontSize="12rem"
									lineHeight={1}
									color="primary"
									display="block"
								>
									404
								</Typography>
								<Typography component="span" variant="h5" display="block">
									The board you are looking for cannot be found
								</Typography>
							</Typography>
							<Box textAlign="center" mt={8}>
								<Button
									LinkComponent={RouterLink}
									to="/boards"
									variant="contained"
									size="large"
								>
									Go Boards page
								</Button>
							</Box>
						</>
					)}
					{isLoading && <p>loading...</p>}
					{isSuccess && (
						<>
							<Box component="section">
								<Box
									display="flex"
									justifyContent="space-between"
									alignItems="start"
								>
									<EditableBoardName
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
									Created at{" "}
									{dayjs(board.createdAt).format("dddd, MMMM DD, YYYY")}
								</Typography>
								<Divider />
							</Box>
							<Box component="section" mt={4}>
								<Grid container spacing={{ xs: 2, md: 3 }}>
									{lists.map(({ name, title }) => (
										<Grid item xs={12} sm={6} md={3} key={name}>
											<BoardList
												list={{ name, title, tasks: tasks[name] }}
												board={board._id}
											/>
										</Grid>
									))}
								</Grid>
							</Box>
						</>
					)}
				</Box>
			</Layout>
		</>
	);
};

export default Board;

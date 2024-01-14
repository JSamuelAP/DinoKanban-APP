import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Star";
import { amber } from "@mui/material/colors";

import { Layout, CardBoard, CreateBoardForm } from "../components/";

const Boards = () => {
	const [boards] = useState([
		{
			id: "1",
			name: "board 1",
			updatedAt: "2023-12-22T19:15:00.782Z",
			favorite: true,
		},
		{
			id: "2",
			name: "board 2",
			updatedAt: "2024-01-02T19:15:00.782Z",
			favorite: true,
		},
		{
			id: "3",
			name: "board 3",
			updatedAt: "2024-01-03T19:15:00.782Z",
			favorite: true,
		},
		{
			id: "4",
			name: "board 4",
			updatedAt: "2024-01-03T22:15:00.782Z",
			favorite: true,
		},
		{
			id: "5",
			name: "board 5",
			updatedAt: "2024-01-04T20:19:00.782Z",
			favorite: false,
		},
		{
			id: "6",
			name: "board 6",
			updatedAt: "2024-01-04T07:15:00.782Z",
			favorite: false,
		},
		{
			id: "7",
			name: "board 7",
			updatedAt: "2021-08-20T15:00:00.782Z",
			favorite: false,
		},
		{
			id: "8",
			name: "board 8",
			updatedAt: "2020-01-04T19:15:00.782Z",
			favorite: false,
		},
	]);

	return (
		<>
			<Layout>
				<Box component="main" mt={4} mb={8}>
					<Box component="section" mb={6}>
						<Typography component="h2" variant="h3" mb={3}>
							Favorites
							<FavoriteIcon
								fontSize="3rem"
								sx={{ verticalAlign: "top", ml: 1, color: amber[500] }}
							/>
						</Typography>
						{boards.filter((board) => board.favorite).length > 0 ? (
							<Grid container spacing={{ xs: 2, md: 3 }}>
								{boards.map((board) => {
									return (
										board.favorite && (
											<Grid item xs={12} sm={6} md={4} xl={3} key={board.id}>
												<CardBoard board={board} />
											</Grid>
										)
									);
								})}
							</Grid>
						) : (
							<Typography color="GrayText" textAlign="center">
								You don&apos;t have favorite boards
							</Typography>
						)}
					</Box>
					<Box component="section">
						<Box display="flex" justifyContent="space-between" mb={3}>
							<Typography component="h2" variant="h3">
								Your boards
							</Typography>
							<CreateBoardForm />
						</Box>
						{boards.length > 0 ? (
							<Grid container spacing={{ xs: 2, md: 3 }}>
								{boards.map((board) => {
									return (
										<Grid item xs={12} sm={6} md={4} xl={3} key={board.id}>
											<CardBoard board={board} />
										</Grid>
									);
								})}
							</Grid>
						) : (
							<Typography color="GrayText" textAlign="center">
								Looks like you don&apos;t have any boards yet. Create one to
								start organizing your tasks!
							</Typography>
						)}
					</Box>
				</Box>
			</Layout>
		</>
	);
};

export default Boards;

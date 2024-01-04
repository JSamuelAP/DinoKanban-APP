import { Box, Card, Fab, Grid, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Star";
import AddIcon from "@mui/icons-material/Add";

import Layout from "../components/Layout";

const boards = [
	{ id: 1, title: "board 1", favorite: true },
	{ id: 2, title: "board 2", favorite: true },
	{ id: 3, title: "board 3", favorite: true },
	{ id: 4, title: "board 4", favorite: true },
	{ id: 5, title: "board 5", favorite: false },
	{ id: 6, title: "board 6", favorite: false },
	{ id: 7, title: "board 7", favorite: false },
	{ id: 8, title: "board 8", favorite: false },
];

const Boards = () => {
	return (
		<>
			<Layout>
				<Box component="main" mt={4}>
					<Box component="section" mb={4}>
						<Typography component="h2" variant="h3" mb={3}>
							Favorites
							<FavoriteIcon
								fontSize="3rem"
								color="warning"
								sx={{ verticalAlign: "top", ml: 1 }}
							/>
						</Typography>
						<Grid container spacing={2}>
							{/* TODO: create board card component */}
							{boards.map((board) => {
								return (
									board.favorite && (
										<Grid item xs={3} key={board.id}>
											<Card>{board.title}</Card>
										</Grid>
									)
								);
							})}
						</Grid>
					</Box>
					<Box component="section">
						<Box display="flex" justifyContent="space-between" mb={3}>
							<Typography component="h2" variant="h3">
								Your boards
							</Typography>
							<Fab color="primary" aria-label="add">
								<AddIcon />
								{/* TODO: create form and show it in modal */}
							</Fab>
						</Box>
						<Grid container spacing={1}>
							{boards.map((board) => {
								return (
									<Grid item xs={3} key={board.id}>
										<Card>{board.title}</Card>
									</Grid>
								);
							})}
						</Grid>
					</Box>
				</Box>
			</Layout>
		</>
	);
};

export default Boards;

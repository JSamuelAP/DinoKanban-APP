import { Alert, Box, Grid, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Star";
import { amber } from "@mui/material/colors";

import { Layout, CardBoard, CreateBoardForm } from "../components/";
import { useQuery } from "@tanstack/react-query";
import useApiPrivate from "../hooks/useApiPrivate";
import { getBoards } from "../services/boardsServices";

const Boards = () => {
	const api = useApiPrivate();
	const { data, isPending, isError } = useQuery({
		queryKey: ["boards"],
		queryFn: () => getBoards(api),
		retry: 0,
	});
	const boards = data?.data?.boards || [];

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
						{isPending ? (
							<p>loading...</p>
						) : boards.filter((board) => board.favorite).length > 0 ? (
							<Grid container spacing={{ xs: 2, md: 3 }}>
								{boards.map((board) => {
									return (
										board.favorite && (
											<Grid item xs={12} sm={6} md={4} xl={3} key={board._id}>
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
						{isPending ? (
							<p>loading...</p>
						) : isError ? (
							<Alert severity="error">
								There was a problem while searching your boards, please try
								later.
							</Alert>
						) : boards.length > 0 ? (
							<Grid container spacing={{ xs: 2, md: 3 }}>
								{boards.map((board) => {
									return (
										<Grid item xs={12} sm={6} md={4} xl={3} key={board._id}>
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

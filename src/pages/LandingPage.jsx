import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { Layout } from "../components/";
import { Link as RouterLink } from "react-router-dom";

const LandingPage = () => {
	return (
		<>
			<Layout maxWidth="md">
				<Box component="section" mt={5}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6} sx={{ order: { md: 2 } }}>
							<Paper elevation={12} sx={{ mt: { md: 5 }, overflow: "hidden" }}>
								<Box
									component="img"
									src="/ui-screenshot.png"
									alt="Kanban board"
									display="block"
									sx={{ maxWidth: "100%" }}
								/>
							</Paper>
						</Grid>
						<Grid item xs={12} md={6}>
							<Box
								sx={{ height: "100%", display: "flex", alignItems: "center" }}
							>
								<Box>
									<Typography
										component="h1"
										variant="h3"
										fontWeight={500}
										gutterBottom
									>
										Organize your project tasks with kanban boards
									</Typography>
									<Typography
										component="p"
										variant="subtitle1"
										color="text.secondary"
										gutterBottom
									>
										This is the landing page of my fullstack project. DinoKanban
										is a kanban boards web app where you can manage boards and
										keep track of tasks 🚀.
									</Typography>
									<Button
										component={RouterLink}
										to="/signup"
										variant="contained"
										size="large"
									>
										Get Started Free
									</Button>
								</Box>
							</Box>
						</Grid>
					</Grid>
				</Box>
				<Box component="section" sx={{ py: { xs: "4rem", md: "6rem" } }}>
					<Typography component="h2" variant="h4" textAlign="center">
						Streamline Your Workflow
					</Typography>
					<Typography
						variant="subtitle1"
						textAlign="center"
						color="text.secondary"
					>
						My kanban board app offers a suite of features to help you stay
						organized and productive.
					</Typography>
					<Grid container columnSpacing={5} rowGap={2} mt={2}>
						<Grid item xs={12} md={7} sx={{ order: { md: 2 } }}>
							<Paper elevation={12} sx={{ overflow: "hidden" }}>
								<Box
									component="img"
									src="/ui-demo.gif"
									alt="Animation about features"
									display="block"
									sx={{ width: "100%", maxWidth: "100%" }}
								/>
							</Paper>
						</Grid>
						<Grid item xs={12} md={5}>
							<Typography component="h3" variant="h6">
								Drag-and-Drop Tasks
							</Typography>
							<Typography color="text.secondary" mb={2}>
								Easily organize your tasks between status with an intuitive
								drag-and-drop system 🤚.
							</Typography>
							<Typography component="h3" variant="h6">
								Authentication
							</Typography>
							<Typography color="text.secondary" mb={2}>
								Sign up to save your boards. The app uses a token system to keep
								your session open and secure 🔐.
							</Typography>
							<Typography component="h3" variant="h6">
								Mark as favorite
							</Typography>
							<Typography color="text.secondary" mb={2}>
								highlight your favorite boards and access them quickly 🌟.
							</Typography>
						</Grid>
					</Grid>
				</Box>
				<Box component="section">
					<Typography component="h2" variant="h4" textAlign="center">
						What My Customers Say
					</Typography>
					<Typography
						variant="subtitle1"
						textAlign="center"
						color="text.secondary"
					>
						This is not a real product, so since I don&apos;t have clients yet,
						let me tell you how this app is built.
					</Typography>
					<Grid container rowSpacing={2} columnSpacing={3} mt={2}>
						<Grid item xs={12} sm={6} md={4}>
							<Card>
								<CardContent sx={{ textAlign: "center" }}>
									<Typography
										component="blockquote"
										fontWeight={500}
										gutterBottom
									>
										&quot;Dinokanban API was developed by myself, is a REST API
										that manage boards, tasks and authentication. Built with
										Nodejs, express and MongoDB.&quot;
									</Typography>
									<Typography>JSamuel</Typography>
									<Typography variant="body2" color="text.secondary">
										Backend developer
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Card>
								<CardContent sx={{ textAlign: "center" }}>
									<Typography
										component="blockquote"
										fontWeight={500}
										gutterBottom
									>
										&quot;My favorite part was authentication, I learned a lot
										by implementing access tokens and refresh tokens, making the
										app more secure.&quot;
									</Typography>
									<Typography>NoobSammy (me too)</Typography>
									<Typography variant="body2" color="text.secondary">
										Backend developer
									</Typography>
								</CardContent>
							</Card>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Card>
								<CardContent sx={{ textAlign: "center" }}>
									<Typography
										component="blockquote"
										fontWeight={500}
										gutterBottom
									>
										&quot;For the frontend use React and Material UI, it was a
										real challenge to implement the drag-and-drop and update the
										positions in the database.&quot;
									</Typography>
									<Typography>JSamuel</Typography>
									<Typography variant="body2" color="text.secondary">
										Frontend developer
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					</Grid>
				</Box>
				<Box component="section" sx={{ py: { xs: "4rem", md: "6rem" } }}>
					<Typography
						component="h2"
						variant="h4"
						fontWeight={500}
						align="center"
						gutterBottom
					>
						Get Started with DinoKanban App
					</Typography>
					<Typography variant="subtitle1" align="center" color="text.secondary">
						This form doesn&apos;t subscribe you to anything, but it looks nice
						on a landing page, right?
					</Typography>
					<Box
						sx={{
							display: "flex",
							flexDirection: { xs: "column", sm: "row" },
							justifyContent: "center",
						}}
						mt={2}
						columnGap={2}
						rowGap={1}
					>
						<TextField
							type="email"
							placeholder="Enter your email"
							size="small"
							sx={{ width: { xs: "100%", sm: 300 } }}
						/>
						<Button
							component={RouterLink}
							to="/signup"
							variant="contained"
							sx={{ width: { xs: "100%", sm: "auto" } }}
						>
							Get Started
						</Button>
					</Box>
				</Box>
				<Box component="footer" py={3}>
					<Typography align="center">
						@2024 DinoKanban App 🦖 By{" "}
						<Link href="http://jsamuelap.github.io" target="_blank">
							JSamuel
						</Link>{" "}
						| All rights reserved.
					</Typography>
				</Box>
			</Layout>
		</>
	);
};

export default LandingPage;

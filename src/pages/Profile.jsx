import { Box, Typography } from "@mui/material";
import AccountIcon from "@mui/icons-material/AccountCircle";
import CalendarIcon from "@mui/icons-material/CalendarMonth";

import Layout from "../components/Layout";
import dayjs from "../helpers/dayjs";

const user = {
	name: "User name",
	email: "example@email.com",
	createdAt: "2023-12-22T19:15:00.782Z",
};

const Profile = () => {
	return (
		<>
			<Layout maxWidth="md">
				<Box component="main" mt={4}>
					<Typography component="h1" variant="h2" mb={1}>
						Your profile
					</Typography>
					<Box
						display="flex"
						gap={2}
						flexDirection={{ xs: "column", md: "row" }}
						alignItems="center"
						mb={4}
					>
						<AccountIcon sx={{ fontSize: "16rem" }} color="primary" />
						<Box
							display="flex"
							flexDirection="column"
							justifyContent="center"
							textAlign={{ xs: "center", md: "left" }}
							maxWidth="100%"
						>
							<Typography component="h2" variant="h3" fontWeight={500}>
								{user.name}
							</Typography>
							<Typography component="h3" variant="h4" noWrap>
								{user.email}
							</Typography>
						</Box>
					</Box>
					<Typography
						component="time"
						dateTime={dayjs(user.createdAt).format("YYYY-MM-DD")}
						variant="h6"
					>
						<CalendarIcon
							fontSize="large"
							sx={{ verticalAlign: "bottom", mr: 0.5 }}
						/>
						Created at {dayjs(user.createdAt).format("dddd, MMMM DD, YYYY")}
					</Typography>
				</Box>
			</Layout>
		</>
	);
};

export default Profile;

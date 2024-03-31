import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import AccountIcon from "@mui/icons-material/AccountCircle";

import useAuthStore from "../store/authStore.js";

const ProfileBox = ({ minWidth = 0, maxWidth = 300 }) => {
	const { user } = useAuthStore();

	return (
		<Box display="flex" columnGap={1}>
			<AccountIcon sx={{ fontSize: "2.8rem" }} color="primary" />
			<Box
				display="flex"
				flexDirection="column"
				justifyContent="center"
				minWidth={minWidth}
				maxWidth={maxWidth}
			>
				<Typography fontWeight={500} noWrap>
					{user?.username}
				</Typography>
				<Typography
					variant="caption"
					color="gray"
					lineHeight={1}
					noWrap
					overflow="visible"
				>
					{user?.email}
				</Typography>
			</Box>
		</Box>
	);
};

ProfileBox.propTypes = {
	minWidth: PropTypes.number,
	maxWidth: PropTypes.number,
};

export default ProfileBox;

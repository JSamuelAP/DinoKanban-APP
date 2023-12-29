import PropTypes from "prop-types";
import { Box, Typography } from "@mui/material";
import AccountIcon from "@mui/icons-material/AccountCircle";

const ProfileBox = ({ minWidth = 0, maxWidth = 300 }) => {
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
					Username
				</Typography>
				<Typography
					variant="caption"
					color="gray"
					lineHeight={1}
					noWrap
					overflow="visible"
				>
					user@email.com
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

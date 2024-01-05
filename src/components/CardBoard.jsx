import PropTypes from "prop-types";
import { Card, CardHeader, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import BoardIcon from "@mui/icons-material/ViewKanban";
import { grey } from "@mui/material/colors";

import dayjs from "../helpers/dayjs.js";
import CardBoardMenu from "./CardBoardMenu.jsx";

const CardBoard = ({ board: { id, name, updatedAt, favorite = false } }) => {
	return (
		<>
			<Card
				component="article"
				variant="outlined"
				sx={{ ":hover": { bgcolor: grey[100] } }}
			>
				<Link
					component={RouterLink}
					to={`/boards/${id}`}
					underline="none"
					color="unset"
				>
					<CardHeader
						avatar={<BoardIcon color="primary" sx={{ fontSize: "2.5rem" }} />}
						title={name}
						titleTypographyProps={{ fontWeight: "500" }}
						subheader={`Updated ${dayjs(updatedAt).fromNow()}`}
						subheaderTypographyProps={{ noWrap: true, maxWidth: 148 }}
						action={<CardBoardMenu id={id} favorite={favorite} />}
					/>
				</Link>
			</Card>
		</>
	);
};

CardBoard.propTypes = {
	board: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		updatedAt: PropTypes.string.isRequired,
		favorite: PropTypes.bool,
	}),
};

export default CardBoard;

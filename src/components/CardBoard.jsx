import PropTypes from "prop-types";
import { useState } from "react";
import { Card, CardActionArea, CardHeader, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BoardIcon from "@mui/icons-material/ViewKanban";
import { grey } from "@mui/material/colors";

import dayjs from "../helpers/dayjs.js";
import CardBoardMenu from "./CardBoardMenu.jsx";
import EditableBoardName from "./EditableBoardName.jsx";

const ResponsiveCardHeader = styled(CardHeader)({
	".MuiCardHeader-content": {
		width: 148,
	},
});

const CardBoard = ({ board }) => {
	const navigate = useNavigate();
	const [editMode, setEditMode] = useState(false);

	return (
		<>
			<Card
				component="article"
				variant="outlined"
				sx={{ ":hover": { bgcolor: grey[100] } }}
			>
				<CardActionArea
					role="link"
					tabIndex={0}
					component="div"
					onClick={() => {
						navigate(`/boards/${board._id}`);
					}}
				>
					<ResponsiveCardHeader
						avatar={<BoardIcon color="primary" sx={{ fontSize: "2.5rem" }} />}
						title={
							<EditableBoardName
								isEditMode={editMode}
								board={board}
								handleBlur={() => setEditMode(false)}
							/>
						}
						titleTypographyProps={{ fontWeight: "500" }}
						subheader={`Updated ${dayjs(board.updatedAt).fromNow()}`}
						subheaderTypographyProps={{
							noWrap: true,
						}}
						action={
							<CardBoardMenu
								board={board}
								handleEdit={() => setEditMode(true)}
							/>
						}
					/>
				</CardActionArea>
			</Card>
		</>
	);
};

CardBoard.propTypes = {
	board: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		updatedAt: PropTypes.string.isRequired,
		favorite: PropTypes.bool,
	}),
};

export default CardBoard;

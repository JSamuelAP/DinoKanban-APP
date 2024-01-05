import PropTypes from "prop-types";
import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CardTask from "./CardTask";

const BoardList = ({ list: { title, tasks } }) => {
	return (
		<>
			<Card>
				<CardHeader
					title={title}
					titleTypographyProps={{
						component: "h2",
						fontSize: "medium",
						fontWeight: 500,
					}}
					sx={{ pb: 0 }}
				/>
				<CardContent>
					<Stack spacing={1}>
						{tasks.map((task) => (
							<CardTask task={task} key={task.id} />
						))}
						<Button startIcon={<AddIcon />} fullWidth>
							Add task
						</Button>
					</Stack>
				</CardContent>
			</Card>
		</>
	);
};

BoardList.propTypes = {
	list: PropTypes.shape({
		title: PropTypes.string.isRequired,
		tasks: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
			})
		).isRequired,
	}).isRequired,
};

export default BoardList;

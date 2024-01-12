import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";

import CardTask from "./CardTask";
import CreateTaskForm from "./CreateTaskForm";

const BoardList = ({ list: { name, title, tasks }, board }) => {
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
						<CreateTaskForm list={name} board={board} />
					</Stack>
				</CardContent>
			</Card>
		</>
	);
};

BoardList.propTypes = {
	list: PropTypes.shape({
		name: PropTypes.oneOf(["backlog", "todo", "doing", "done"]),
		title: PropTypes.string.isRequired,
		tasks: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
			})
		).isRequired,
	}).isRequired,
	board: PropTypes.string.isRequired,
};

export default BoardList;

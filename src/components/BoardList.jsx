import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import { Droppable } from "react-beautiful-dnd";

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
					<Droppable droppableId={name}>
						{(provided) => (
							<Stack
								spacing={1}
								mb={1}
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{tasks.map((task) => (
									<CardTask task={task} key={task._id} />
								))}
								{provided.placeholder}
							</Stack>
						)}
					</Droppable>
					<CreateTaskForm list={name} board={board} />
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
				_id: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
			})
		).isRequired,
	}).isRequired,
	board: PropTypes.string.isRequired,
};

export default BoardList;

import { findTaskById } from "../helpers/tasks.js";
import { useQueryClient } from "@tanstack/react-query";

const useDragAndDrop = (boardID, onDragEnd) => {
	const queryClient = useQueryClient();

	const handleDragStart = ({ source }, provided) => {
		provided.announce(`You have lifted the task in position ${source.index}`);
	};

	const handleDragUpdate = ({ destination }, provided) => {
		provided.announce(
			destination
				? `You have moved the task to position ${destination.index || 1}`
				: `You are currently not over a droppable area`
		);
	};

	const handleDragEnd = async (
		{ source, destination, draggableId },
		provided
	) => {
		provided.announce(
			destination
				? `You have moved the task to position ${source.index} to ${
						destination.index || 1
						// eslint-disable-next-line no-mixed-spaces-and-tabs
				  }`
				: `The task has been returned to its starting position of ${source.index}`
		);

		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		const taskUpdated = {
			id: draggableId,
			status: destination.droppableId,
			destination: destination.index || 1,
		};
		onDragEnd(taskUpdated);

		await queryClient.cancelQueries({ queryKey: ["tasks", "board", boardID] });
		await queryClient.setQueryData(["tasks", "board", boardID], (oldTasks) => {
			const taskToUpdate = findTaskById(oldTasks, taskUpdated.id);
			const sourceStatus = taskToUpdate.status;
			const destinationStatus = taskUpdated.status;

			if (destinationStatus !== sourceStatus) {
				// Moved to a different status

				// Delete task from original status
				oldTasks[sourceStatus].splice(taskToUpdate.order - 1, 1);

				// +1 order in tasks with greater than or equal in destination status
				oldTasks[destinationStatus] = oldTasks[destinationStatus].map((t) => {
					if (t.order >= taskToUpdate.order) t.order++;
					return t;
				});
				// Insert task in destination status
				oldTasks[destinationStatus].splice(
					taskUpdated.destination - 1,
					0,
					taskToUpdate
				);
			} else {
				// Moved to a different position inside same status

				const direction =
					taskUpdated.destination < taskToUpdate.order ? "up" : "down";

				if (direction === "up") {
					// Move to a higher position

					// +1 order in task with greater than or equal order of new order
					// and less than original order
					oldTasks[sourceStatus] = oldTasks[sourceStatus].map((t) => {
						if (
							t.order >= taskUpdated.destination &&
							t.order < taskToUpdate.order
						)
							t.order++;
						return t;
					});
				} else if (direction === "down") {
					// Move to a lower position

					// -1 order in task with greater than original order and less than or equal of new order
					oldTasks[sourceStatus] = oldTasks[sourceStatus].map((t) => {
						if (
							t.order > taskToUpdate.order &&
							t.order <= taskUpdated.destination
						)
							t.order--;
						return t;
					});
				}

				// Delete task from status
				oldTasks[sourceStatus].splice(taskToUpdate.order - 1, 1);
				// Insert task in new position
				oldTasks[sourceStatus].splice(
					taskUpdated.destination - 1,
					0,
					taskToUpdate
				);
			}

			return oldTasks;
		});
	};

	return {
		handleDragStart,
		handleDragUpdate,
		handleDragEnd,
	};
};

export default useDragAndDrop;

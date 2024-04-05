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

		// await queryClient.setQueryData(["tasks", "board", boardID], (oldData) => {
		// 	const lists = oldData.data.tasks;
		// 	const taskToUpdate = findTaskById(lists, taskUpdated.id);

		// 	if (taskUpdated.list !== taskToUpdate.list) {
		// 		// Moved to a different list
		// 		// -1 order in tasks with greater than order in original list
		// 		lists[taskToUpdate.list] = lists[taskToUpdate.list].map((t) => {
		// 			if (t.order > taskToUpdate.order) t.order--;
		// 			return t;
		// 		});
		// 		lists[taskToUpdate.list].splice(taskToUpdate.order - 1, 1); // Delete task from original list
		// 		// +1 order in tasks with greater than or equal in destination list
		// 		lists[taskUpdated.list] = lists[taskUpdated.list].map((t) => {
		// 			if (t.order >= taskToUpdate.order) t.order++;
		// 			return t;
		// 		});
		// 		lists[taskUpdated.list].splice(taskUpdated.order - 1, 0, taskToUpdate); // Insert task in destination list
		// 	} else {
		// 		console.log(taskToUpdate.order + "->" + taskUpdated.order);
		// 		// Moved to a different position inside same list
		// 		if (taskUpdated.order < taskToUpdate.order) {
		// 			// Move to a higher position
		// 			// +1 order in task with greater than or equal order of original order
		// 			// and less than new order
		// 			lists[taskToUpdate.list] = lists[taskToUpdate.list].map((t) => {
		// 				if (t.order >= taskToUpdate.order && t.order < taskUpdated.order)
		// 					t.order++;
		// 				return t;
		// 			});
		// 		} else if (taskUpdated.order > taskToUpdate.order) {
		// 			// Move to a lower position
		// 			// -1 order in task with greater than new order and less than or equal of original order
		// 			lists[taskToUpdate.list] = lists[taskToUpdate.list].map((t) => {
		// 				if (t.order > taskUpdated.order && t.order <= taskToUpdate.order)
		// 					t.order--;
		// 				return t;
		// 			});
		// 		}
		// 		lists[taskToUpdate.list].splice(taskToUpdate.order - 1, 1); // Delete task from list
		// 		lists[taskToUpdate.list].splice(taskUpdated.order - 1, 0, taskToUpdate); // Insert task in new position
		// 	}

		// 	return { ...oldData, data: { tasks: lists } };
		// });

		onDragEnd(taskUpdated);
	};

	return {
		handleDragStart,
		handleDragUpdate,
		handleDragEnd,
	};
};

export default useDragAndDrop;

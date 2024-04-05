const findTaskById = (statues, id) => {
	const tasks = [
		...statues.backlog,
		...statues.todo,
		...statues.doing,
		...statues.done,
	];
	return tasks.find((task) => task._id === id);
};

export { findTaskById };

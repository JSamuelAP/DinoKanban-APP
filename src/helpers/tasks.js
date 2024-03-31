const findTaskById = (lists, id) => {
	const tasks = [
		...lists.backlog,
		...lists.todo,
		...lists.doing,
		...lists.done,
	];
	return tasks.find((task) => task._id === id);
};

export { findTaskById };

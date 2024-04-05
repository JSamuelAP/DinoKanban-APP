const getTasks = async (api, boardID) => {
	const response = await api.get("/tasks", {
		params: {
			board: boardID,
		},
	});
	return response.data;
};

const createTask = async (api, body) => {
	const response = await api.post("/tasks", body);
	return response.data;
};

const updateTask = async (api, id, body) => {
	const response = await api.patch("/tasks/" + id, body);
	return response.data;
};

// TODO: fix bug when middle task is deleted
const deleteTask = async (api, id) => {
	const response = await api.delete("/tasks/" + id);
	return response.data;
};

export { getTasks, createTask, updateTask, deleteTask };

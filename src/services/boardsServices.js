const getBoards = async (api) => {
	const response = await api.get("boards");
	return response.data?.data?.boards || [];
};

const getBoard = async (api, id) => {
	const response = await api.get("boards/" + id);
	return response.data?.data?.board || {};
};

const createBoard = async (api, body) => {
	const response = await api.post("boards", body);
	return response.data;
};

const updateBoard = async (api, id, body) => {
	const response = await api.patch("boards/" + id, body);
	return response.data;
};

const deleteBoard = async (api, id) => {
	const response = await api.delete("boards/" + id);
	return response.data;
};

export { getBoards, getBoard, createBoard, updateBoard, deleteBoard };

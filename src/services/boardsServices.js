import axios from "axios";

const getBoards = async (api) => {
	const response = await api.get("boards", {
		transformResponse: axios.defaults.transformResponse.concat((data) => {
			if (data.success) {
				data.data.boards = data.data.boards.map((board) => ({
					...board,
					favorite: true,
				}));
			}
			return data;
		}),
	});
	return response.data;
};

const getBoard = async (api, id) => {
	const response = await api.get("boards/" + id, {
		transformResponse: axios.defaults.transformResponse.concat((data) => {
			if (data.success) data.data.board.favorite = true;
			return data;
		}),
	});
	return response.data;
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

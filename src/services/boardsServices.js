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

export { getBoards };

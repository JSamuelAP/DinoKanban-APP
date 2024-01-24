const getCards = async (api, boardID) => {
	const response = await api.get("/cards", {
		params: {
			board: boardID,
		},
	});
	return response.data;
};

export { getCards };

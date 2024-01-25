const getCards = async (api, boardID) => {
	const response = await api.get("/cards", {
		params: {
			board: boardID,
		},
	});
	return response.data;
};

const createCard = async (api, body) => {
	const response = await api.post("/cards", body);
	return response.data;
};

export { getCards, createCard };

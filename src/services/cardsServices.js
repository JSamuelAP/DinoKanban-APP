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

const updateCard = async (api, id, body) => {
	const response = await api.patch("/cards/" + id, body);
	return response.data;
};

const deleteCard = async (api, id) => {
	const response = await api.delete("/cards/" + id);
	return response.data;
};

export { getCards, createCard, updateCard, deleteCard };

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useBoardsStore = create(
	persist(
		devtools((set, get) => ({
			favorites: [],
			addFavorite: (boardID) =>
				set(
					(state) => ({ favorites: [...state.favorites, boardID] }),
					false,
					"ADD_FAVORITE"
				),
			removeFavorite: (boardID) =>
				set(
					(state) => ({
						favorites: state.favorites.filter((id) => id !== boardID),
					}),
					false,
					"REMOVE_FAVORITE"
				),
			isFavorite: (boardID) => {
				return get().favorites.includes(boardID);
			},
		})),
		{ name: "favorites" }
	)
);

export default useBoardsStore;

import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useAuthStore = create(
	devtools((set) => ({
		user: null,
		isAuth: false,
		accessToken: null,
		setSession: (user, token) =>
			set(() => ({ user, isAuth: true, accessToken: token })),
		closeSession: () =>
			set(() => ({ user: null, isAuth: false, accessToken: null })),
		setToken: (token) => set(() => ({ accessToken: token })),
	}))
);

export default useAuthStore;

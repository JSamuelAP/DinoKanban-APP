import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useAuthStore = create(
	devtools((set) => ({
		user: null,
		isAuth: false,
		accessToken: null,
		setSession: (user, token) =>
			set(() => ({ user, isAuth: true, accessToken: token }), false, "LOGIN"),
		closeSession: () =>
			set(
				() => ({ user: null, isAuth: false, accessToken: null }),
				false,
				"LOGOUT"
			),
		setToken: (token) =>
			set(() => ({ accessToken: token }), false, "SET_TOKEN"),
	}))
);

export default useAuthStore;

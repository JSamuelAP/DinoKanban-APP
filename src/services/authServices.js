import api from "../api/axios.js";

const login = async (credentials) => {
	const response = await api.post("auth/login", credentials, {
		withCredentials: true,
	});
	return response.data;
};

const signup = async (userInfo) => {
	const response = await api.post("auth/signup", userInfo);
	return response.data;
};

const refreshToken = async () => {
	const response = await api.get("auth/refresh-token", {
		withCredentials: true,
	});
	return response.data;
};

const logout = async () => {
	const response = await api.delete("auth/logout", { withCredentials: true });
	return response;
};

export { login, signup, refreshToken, logout };

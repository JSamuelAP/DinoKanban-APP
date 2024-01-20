import { useEffect } from "react";

import { apiPrivate } from "../api/axios.js";
import useAuthStore from "../store/authStore.js";
import { logout, refreshToken } from "../services/authServices.js";
import { useLocation, useNavigate } from "react-router-dom";

const useApiPrivate = () => {
	const { accessToken, setToken, closeSession } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const requestIntercept = apiPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers["Authorization"])
					config.headers["Authorization"] = `Bearer ${accessToken}`;
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseIntercept = apiPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 401 && !prevRequest?.sent) {
					prevRequest.sent = true;
					try {
						const response = await refreshToken();
						const newAccessToken = response.data.token;
						setToken(newAccessToken);
						prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
						return apiPrivate(prevRequest);
					} catch (error) {
						logout();
						closeSession();
						localStorage.removeItem("user");
						navigate("/login", { state: { from: location }, replace: true });
						return Promise.reject(error);
					}
				}
				return Promise.reject(error);
			}
		);

		return () => {
			apiPrivate.interceptors.request.eject(requestIntercept);
			apiPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [accessToken, setToken, navigate, location, closeSession]);

	return apiPrivate;
};

export default useApiPrivate;

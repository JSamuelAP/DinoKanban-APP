import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore.js";
import { refreshToken } from "../services/authServices.js";

const PersistLogin = () => {
	const { accessToken, setSession } = useAuthStore();
	const navigate = useNavigate();
	const location = useLocation();
	const user = localStorage.getItem("user");

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				const response = await refreshToken();
				const newAccessToken = response.data.token;
				setSession(JSON.parse(user), newAccessToken);
			} catch (error) {
				navigate("/login", { state: { from: location }, replace: true });
			}
		};

		!accessToken && verifyRefreshToken();
	}, [navigate, location, user, accessToken, setSession]);

	return <Outlet />;
};

export default PersistLogin;

import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import useAuthStore from "../store/authStore.js";
import { refreshToken } from "../services/authServices.js";

const PersistLogin = () => {
	const { accessToken, setSession } = useAuthStore();
	const [loading, setLoading] = useState(true);
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
			} finally {
				setLoading(false);
			}
		};

		!accessToken ? verifyRefreshToken() : setLoading(false);
	}, [navigate, location, user, accessToken, setSession]);

	return loading ? <p>loading...</p> : <Outlet />;
};

export default PersistLogin;

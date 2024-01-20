import { Navigate, Outlet, useLocation } from "react-router-dom";

import useAuthStore from "../store/authStore";

const ProtectedRoute = () => {
	const { isAuth } = useAuthStore();
	const location = useLocation();

	return isAuth ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default ProtectedRoute;

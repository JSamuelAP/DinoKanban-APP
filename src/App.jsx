import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	Board,
	Boards,
	Error404,
	LandingPage,
	Login,
	Profile,
	Signup,
} from "./pages/";
import { PersistLogin, ProtectedRoute } from "./components/";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route element={<PersistLogin />}>
						<Route element={<ProtectedRoute />}>
							<Route path="/boards" element={<Boards />} />
							<Route path="/boards/:id" element={<Board />} />
							<Route path="/profile" element={<Profile />} />
						</Route>
					</Route>
					<Route path="*" element={<Error404 />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
	Board,
	Boards,
	Error404,
	LandingPage,
	Login,
	Profile,
	Signup,
} from "./pages/index.js";
import Layout from "./components/Layout.jsx";

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route
						path="/"
						element={
							<Layout>
								<LandingPage />
							</Layout>
						}
					/>
					<Route
						path="/login"
						element={
							<Layout>
								<Login />
							</Layout>
						}
					/>
					<Route
						path="/signup"
						element={
							<Layout>
								<Signup />
							</Layout>
						}
					/>
					<Route
						path="/boards"
						element={
							<Layout>
								<Boards />
							</Layout>
						}
					/>
					<Route
						path="/boards/:id"
						element={
							<Layout>
								<Board />
							</Layout>
						}
					/>
					<Route
						path="/profile"
						element={
							<Layout>
								<Profile />
							</Layout>
						}
					/>
					<Route path="*" element={<Error404 />} />
				</Routes>
			</Router>
		</>
	);
}

export default App;

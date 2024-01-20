import { Alert, Box, Link, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import {
	Link as RouterLink,
	Navigate,
	useNavigate,
	useLocation,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Layout } from "../components/";
import logo from "../assets/DinoKanban logo horizontal x512.png";
import useAuthStore from "../store/authStore.js";
import { login } from "../services/authServices.js";

const Login = () => {
	const { setSession, isAuth } = useAuthStore();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();
	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || "/boards";

	const {
		mutate: loginUser,
		isPending,
		isError,
		error,
	} = useMutation({
		mutationFn: (data) => login(data),
		onSuccess: (response) => {
			reset();
			setSession(response.data.user, response.data.token);
			localStorage.setItem("user", JSON.stringify(response.data.user));
			navigate(from, { replace: true });
		},
	});

	const onSubmit = handleSubmit((data) => {
		loginUser(data);
	});

	if (isAuth) return <Navigate to="/boards" />;

	return (
		<>
			<Layout maxWidth="xs" containerStyles={{ maxWidth: { md: "md" } }}>
				<Box
					display="flex"
					height="100%"
					justifyContent="center"
					rowGap={5}
					columnGap={10}
					sx={{ flexDirection: { xs: "column", md: "row" } }}
				>
					<Box
						display="flex"
						alignItems="center"
						sx={{
							justifyContent: { xs: "center", md: "right" },
							flex: { md: 1 },
						}}
					>
						<Box
							component="img"
							src={logo}
							width="100%"
							sx={{ textAlign: { xs: "center", md: "right" } }}
						/>
					</Box>
					<Box
						display="flex"
						flexDirection="column"
						justifyContent="center"
						rowGap={2}
						sx={{ flex: { md: 1 } }}
					>
						<Typography component="h1" variant="h3" align="center">
							Welcome
						</Typography>
						<Box component="form" onSubmit={onSubmit}>
							<Box mb={2}>
								<TextField
									{...register("email", {
										required: "Email is required",
										pattern: {
											value: /^[a-z0-9._%+-]+@([a-z0-9.-]+\.)+[a-z]{2,4}$/,
											message: "Invalid email",
										},
									})}
									type="email"
									label="Email"
									error={!!errors.email}
									helperText={errors.email?.message}
									variant="standard"
									fullWidth
								/>
							</Box>
							<Box mb={4}>
								<TextField
									{...register("password", {
										required: "Password is required",
									})}
									type="password"
									label="Password"
									error={!!errors.password}
									helperText={errors.password?.message}
									variant="standard"
									fullWidth
								/>
							</Box>
							<LoadingButton
								loading={isPending}
								loadingIndicator="Login..."
								type="submit"
								variant="contained"
								size="large"
								fullWidth
							>
								login
							</LoadingButton>
							{isError && (
								<Alert severity="error" sx={{ mt: 2 }}>
									{error?.response?.data?.message || "Something went wrong"}
								</Alert>
							)}
							<Typography align="center" mt={2}>
								Don&apos;t have an account?
								<Link
									component={RouterLink}
									to="/signup"
									color="primary"
									underline="hover"
									sx={{ display: "block" }}
								>
									Create new account
								</Link>
							</Typography>
						</Box>
					</Box>
				</Box>
			</Layout>
		</>
	);
};

export default Login;

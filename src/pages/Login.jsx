import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";

import Layout from "../components/Layout";
import logo from "../assets/DinoKanban logo horizontal x512.png";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		watch,
	} = useForm();

	const onSubmit = handleSubmit((data) => {
		console.log(data);
		reset();
	});

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
							<Button type="submit" variant="contained" size="large" fullWidth>
								login
							</Button>
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

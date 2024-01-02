import { useForm } from "react-hook-form";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import Layout from "../components/Layout";
import logo from "../assets/DinoKanban logo horizontal x512.png";

const Signup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
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
					columnGap={5}
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
							Create account
						</Typography>
						<Box component="form" onSubmit={onSubmit}>
							<Box mb={2}>
								<TextField
									{...register("username", {
										required: "Username is required",
										maxLength: {
											value: 16,
											message: "Max length for username is 16 characters",
										},
									})}
									type="text"
									label="Username"
									error={!!errors.username}
									helperText={errors.username?.message}
									variant="standard"
									fullWidth
								/>
							</Box>
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
										pattern: {
											value:
												/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
											message:
												"Password must be at least 8 characters long, one uppercase letter and include one lowercase letter, one digit and one special character",
										},
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
								Already have an account?
								<Link
									component={RouterLink}
									to="/login"
									color="primary"
									underline="hover"
									sx={{ display: "block" }}
								>
									Login
								</Link>
							</Typography>
						</Box>
					</Box>
				</Box>
			</Layout>
		</>
	);
};

export default Signup;

import { Button } from "@/components/ui/button";
import { UseAuthContext } from "@/context/auth-context";
import { loginUser } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { InputGroup } from "@/components/forms/form-input";
import ErrorElement from "@/components/ui/error";

// const oldLoginForm = () => {
// 	const router = useRouter();
// 	const { setIsAuthenticated, setAccessToken } = UseAuthContext();
// 	const [userEmail, setUserEmail] = useState<string>("");
// 	const [password, setPassword] = useState<string>("");
// 	const [isLoading, setIsLoading] = useState<boolean>(false);
// 	const [err, setErr] = useState("");
// 	const [errors, setErrors] = useState({});

// 	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
// 	useEffect(() => {
// 		setErr("");
// 	}, [userEmail, password]);
// 	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		setIsLoading(true);
// 		loginUser(userEmail, password)
// 			.then((data) => {
// 				setIsLoading(false);
// 				setAccessToken(data.access_token);
// 				setIsAuthenticated(true);
// 				router.history.back();
// 			})
// 			.catch((err) => {
// 				setIsLoading(false);
// 				setErr(err.message);
// 			});
// 	};

// 	return (
// 		<Card className="w-fit">
// 			<form onSubmit={handleSubmit}>
// 				<CardHeader>
// 					<CardTitle>Login</CardTitle>
// 					<CardDescription className="">
// 						Welcome back! Login to your account {"    "}
// 					</CardDescription>
// 				</CardHeader>
// 				<CardContent>
// 					<div className="grid items-center w-full gap-4">
// 						<div className="flex flex-col space-y-1.5 w-80">
// 							<Label htmlFor="email">Email</Label>
// 							<Input
// 								id="email"
// 								placeholder="johndoe@example.com"
// 								required
// 								type="email"
// 								name="email"
// 								value={userEmail}
// 								onChange={(e) => setUserEmail(e.target.value)}
// 							/>
// 						</div>
// 						<div className="flex flex-col space-y-1.5">
// 							<Label htmlFor="password">Password</Label>
// 							<Input
// 								id="password"
// 								placeholder="Enter password"
// 								required
// 								type="password"
// 								onChange={(e) => setPassword(e.target.value)}
// 							/>
// 							<Link href="#" className="ml-auto text-sm">
// 								Forgot Password?
// 							</Link>
// 						</div>
// 						{err && <p className="text-sm text-red-500">{err}</p>}
// 					</div>
// 				</CardContent>
// 				<CardFooter className="flex justify-between">
// 					{!isLoading ? (
// 						<Button className="w-full" type="submit">
// 							Sign In
// 						</Button>
// 					) : (
// 						<Button disabled className="w-full">
// 							<ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
// 							Please wait
// 						</Button>
// 					)}
// 				</CardFooter>
// 			</form>
// 		</Card>
// 	);
// };

const LoginForm = () => {
	const router = useRouter();
	const { setIsAuthenticated, setAccessToken } = UseAuthContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [err, setErr] = useState(null);
	const schema = z.object({
		email: z
			.string()
			.min(1, { message: "Email is required" })
			.email("Invalid email address"),
		password: z
			.string()
			.min(8, { message: "Password must be at least 8 characters" })
			.regex(/^(?=.*[a-z])/, {
				message: "Password must contain at least one lowercase letter",
			})
			.regex(/^(?=.*[A-Z])/, {
				message: "Password must contain at least one uppercase letter",
			})
			.regex(/^(?=.*\d)/, {
				message: "Password must contain at least one number",
			})
			.regex(/^(?=.*[@$!%*?&])/, {
				message: "Password must contain at least one special character",
			})
			.max(32, { message: "Password must not exceed 32 characters" }),
	});

	type ValidationSchemaType = z.infer<typeof schema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchemaType>({
		resolver: zodResolver(schema),
	});
	const onSubmit: SubmitHandler<ValidationSchemaType> = (data) => {
		setIsLoading(true);
		loginUser(data.email, data.password)
			.then((data) => {
				setIsLoading(false);
				setAccessToken(data.access_token);
				setIsAuthenticated(true);
				router.history.back();
			})
			.catch((err) => {
				setIsLoading(false);
				setErr(err.message);
			});
	};

	return (
		<Card className="w-fit">
			<form onSubmit={handleSubmit(onSubmit)}>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription className="">
						Welcome back! Login to your account {"    "}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid items-center w-full gap-4">
						<InputGroup
							error={errors.email?.message}
							placeholder={"johndoe@example.com"}
							type={"email"}
							label="Email"
							id="email"
							fn={register("email")}
						/>
						<InputGroup
							error={errors.password?.message}
							placeholder={"Enter password"}
							type={"password"}
							label="Password"
							id="password"
							fn={register("password")}
						/>
						{err && <ErrorElement	message={err} />}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					{!isLoading ? (
						<Button className="w-full" type="submit">
							Sign In
						</Button>
					) : (
						<Button disabled className="w-full">
							<ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
							Please wait
						</Button>
					)}
				</CardFooter>
			</form>
		</Card>
	);
};

export default LoginForm;

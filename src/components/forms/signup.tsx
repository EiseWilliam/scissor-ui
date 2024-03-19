import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRegisterAndLogin } from "@/services/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputGroup } from "@/components/forms/form-input";
import ErrorElement from "../ui/error";

// const oldRegisterForm = () => {
// 	const {
// 		userEmail,
// 		password,
// 		ConfirmPassword,
// 		isLoading,
// 		err,
// 		setUserEmail,
// 		setPassword,
// 		setConfirmPassword,
// 		setErr,
// 		handleSubmit,
// 	} = useRegisterAndLogin();
// 	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
// 	useEffect(() => {
// 		setErr("");
// 	}, [userEmail, password, ConfirmPassword, setErr]);
// 	return (
// 		<Card className="w-fit">
// 			<form onSubmit={handleSubmit}>
// 				<CardHeader>
// 					<CardTitle>Sign Up</CardTitle>
// 					<CardDescription>
// 						Create your account by filling out the form below
// 					</CardDescription>
// 				</CardHeader>
// 				<CardContent>
// 					<div className="grid w-full items-center gap-4">
// 						<div className="flex flex-col space-y-1.5 w-80">
// 							<Label htmlFor="email">Email</Label>
// 							<Input
// 								id="email"
// 								placeholder="johndoe@example.com"
// 								required
// 								type="email"
// 								value={userEmail}
// 								onChange={(e) => setUserEmail(e.target.value)}
// 							/>
// 						</div>
// 						<div className="flex flex-col space-y-1.5">
// 							<Label htmlFor="password">Password</Label>
// 							<Input
// 								id="password"
// 								required
// 								type="password"
// 								value={password}
// 								onChange={(e) => setPassword(e.target.value)}
// 							/>
// 						</div>
// 						<div className="flex flex-col space-y-1.5">
// 							<Label htmlFor="confirm-password">Confirm Password</Label>
// 							<Input
// 								id="confirm-password"
// 								required
// 								type="password"
// 								value={ConfirmPassword}
// 								onChange={(e) => setConfirmPassword(e.target.value)}
// 							/>
// 						</div>
// 						{err && <p className="text-red-500">{err}</p>}
// 					</div>
// 				</CardContent>
// 				<CardFooter className="flex justify-between">
// 					{!isLoading ? (
// 						<Button className="w-full" type="submit">
// 							Sign Up
// 						</Button>
// 					) : (
// 						<Button disabled className="w-full">
// 							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
// 							Please wait
// 						</Button>
// 					)}
// 				</CardFooter>
// 			</form>
// 		</Card>
// 	);
// };

export const registerSchema = z
	.object({
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
		confirmPassword: z
			.string()
			.min(1, { message: "Confirm Password is required" }),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ["confirmPassword"],
		message: "Passwords does not match",
	});
const RegisterForm = () => {
	type ValidationSchemaType = z.infer<typeof registerSchema>;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchemaType>({
		resolver: zodResolver(registerSchema),
	});
	const { isLoading, onSubmit, err } = useRegisterAndLogin();
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
							placeholder={"johndoe@example.com"}
							type={"email"}
							label="Email"
							id="email"
							error={errors.email?.message}
							fn={register("email")}
						/>
						<InputGroup
							placeholder={"Enter password"}
							type={"password"}
							label="Password"
							id="password"
							error={errors.password?.message}
							fn={register("password")}
						/>
						<InputGroup
							placeholder={"Confirm password"}
							type={"password"}
							label="Confirm Password"
							id="confirm-password"
							error={errors.confirmPassword?.message}
							fn={register("confirmPassword")}
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

export default RegisterForm;

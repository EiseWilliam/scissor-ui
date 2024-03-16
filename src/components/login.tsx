"use client";

import { Label } from "@/components/bk/label";
import { Input } from "@/components/bk/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/bk/button";
import { Link } from "@tanstack/react-router";
import {
	CardFooter,
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./bk/card";
import { FormEvent, useEffect, useState } from "react";
import { UseAuthContext } from "@/context/auth-context";
import { loginUser } from "@/services/auth";

const LoginForm = () => {
	const router = useRouter();
	const { setIsAuthenticated, setAccessToken } = UseAuthContext();
	const [userEmail, setUserEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [err, setErr] = useState("");

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setErr("");
	}, [userEmail, password]);
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		loginUser(userEmail, password)
			.then((data) => {
				setIsLoading(false);
				setAccessToken(data.access_token);
				setIsAuthenticated(true);
				router.back();
			})
			.catch((err) => {
				setIsLoading(false);
				setErr(err.message);
			});
	};
	return (
		<Card className="w-fit">
			<form onSubmit={handleSubmit}>
				<CardHeader>
					<CardTitle>Login</CardTitle>
					<CardDescription className="">
						Welcome back! Login to your account {"    "}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5 w-80">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="johndoe@example.com"
								required
								type="email"
								name="email"
								value={userEmail}
								onChange={(e) => setUserEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								placeholder="Enter password"
								required
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
							<Link href="#" className="text-sm ml-auto">
								Forgot Password?
							</Link>
						</div>
						{err && <p className="text-red-500 text-sm">{err}</p>}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					{!isLoading ? (
						<Button className="w-full" type="submit">
							Sign In
						</Button>
					) : (
						<Button disabled className="w-full">
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							Please wait
						</Button>
					)}
				</CardFooter>
			</form>
		</Card>
	);
};

export default LoginForm;

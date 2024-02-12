"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
	CardFooter,
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "./ui/card";
import { FormEvent, useEffect, useRef, useState } from "react";
import axios from "axios";
import useAuth from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { LoginResponse } from "@/types";
import { LoadButton } from "./load-button";
import { UseAuthContext } from "@/context/auth-context";

async function loginUser(email: string, password: string) {
	const requestData = new URLSearchParams();
	requestData.append("username", email);
	requestData.append("password", password);
	const res = await fetch("http://localhost:8000/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: requestData,
	});
	//   .then(data => data.json()).catch(err => console.log(err))
	if (res.ok) {
		const responseData: LoginResponse = await res.json();
		window.localStorage.setItem("token", responseData.access_token);
		window.localStorage.setItem("refreshToken", responseData.refresh_token);
	} else {
		console.log(res);
	}
	return res;
}

export default function LoginForm() {
	const router = useRouter();
	const { isAuthenticated, setIsAuthenticated } = UseAuthContext();
	const [userEmail, setUserEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [err, setErr] = useState("");
	const [showPassword, setShowPassword] = useState<boolean>(false);
	// useEffect(() => {
	//     setErr('');
	// }, [userEmail, password])
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		const response = await loginUser(userEmail, password);
		if (response.ok) {
			setIsLoading(false);
			setIsAuthenticated(true);
			router.push("/");
		} else {
			setIsLoading(false);
			alert("Login Failed");
		}
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
}

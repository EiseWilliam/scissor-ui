import { UseAuthContext } from "@/context/auth-context";
import { request } from "@/lib/utils";
import type { LoginResponse } from "@/types";
import { useRouter } from "@tanstack/react-router";
import { type FormEvent, type SetStateAction, useState } from "react";

export async function loginUser(email: string, password: string) {
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
		window.localStorage.setItem("refreshToken", responseData.refresh_token);
		return responseData;
	}
	throw new Error("Invalid credentials");
}

export function registerUser(
	email: string,
	password: string,
	confirm_password: string,
) {
	const requestData = {
		email,
		password,
		confirm_password,
	};
	return request.post("/auth/register", requestData).then((res: { status: number; }) => {
		if (res.status === 200) {

			return Promise.resolve(true);
		}
		if (res.status === 409) {
			console.log("Email already exists");
			return Promise.reject("Email already exists");
		}
		// throw new Error(res.statusText);
	});
}

export const useRegisterAndLogin = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { setIsAuthenticated, setAccessToken } = UseAuthContext();
	const [userEmail, setUserEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [ConfirmPassword, setConfirmPassword] = useState<string>("");
	const [err, setErr] = useState("");
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		registerUser(userEmail, password, ConfirmPassword)
			.then(() => {
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
			})
			.catch((err: { message: SetStateAction<string>; }) => {
				setIsLoading(false);
				setErr(err.message);
			});
	};
	return {
		userEmail,
		password,
		ConfirmPassword,
		isLoading,
		err,
		setUserEmail,
		setPassword,
		setConfirmPassword,
		setErr,
		handleSubmit,
	};
};

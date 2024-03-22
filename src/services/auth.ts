import type { registerSchema } from "@/components/forms/signup";
import { UseAuthContext } from "@/context/auth-context";
import { endpoints } from "@/lib/apiConfig";
import { api, request } from "@/lib/utils";
import type { LoginResponse } from "@/types";
import { useRouter } from "@tanstack/react-router";
import { type FormEvent, type SetStateAction, useState } from "react";
import type { z } from "zod";

export async function loginUser(email: string, password: string) {
	const requestData = new URLSearchParams();
	requestData.append("username", email);
	requestData.append("password", password);
	const res = await fetch("https://scissor-api-bosc.onrender.com/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: requestData,
	});
	//   .then(data => data.json()).catch(err => console.log(err))
	if (res.ok) {
		const responseData = await res.json() as LoginResponse;
		window.localStorage.setItem("accessToken", responseData.access_token);
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
	return request
		.post("/auth/register", requestData)
		.then((res: { status: number }) => {
			if (res.status === 200) {
				return Promise.resolve(true);
			}
			if (res.status === 409) {
				console.log("Email already exists");
				return Promise.reject("Email already exists");
			}
			return Promise.reject("Unknown error occurred");
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
	const onSubmit = (data: z.infer<typeof registerSchema>) => {
		setIsLoading(true);
		registerUser(data.email, data.password, data.confirmPassword)
			.then(() => {
				loginUser(userEmail, password)
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
			})
			.catch((err: { message: SetStateAction<string> }) => {
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
		onSubmit,
	};
};

export const getAccessToken = (refreshToken: string) => {
	return api
		.post(endpoints.refresh_login, { refresh_token: refreshToken })
		.then((res) => {
			if (res.status === 200) {
				return res.data;
			}
			throw new Error("Invalid refresh token");
		}).then((data) => data.access_token);
};

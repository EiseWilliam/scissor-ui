import type React from "react";
import { createContext, useState, useEffect, useContext } from "react";

export type AuthContextType = {
	isAuthenticated: boolean;
	// handleRefreshLogin: () => void;
	accessToken: string | null;
	setAccessToken: (token: string) => void;
	setIsAuthenticated: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

const defaultAuthState = (): boolean => {
	let token: string | null = "";
	if (typeof window !== "undefined") {
		token = window.localStorage.getItem("refreshToken");
	}
	if (token) {
		return true;
	}
	return false;
};
const getAccessToken = (): string => {
	const accessToken: string | null =
		window.localStorage.getItem("accessToken") ?? "";
	if (accessToken) {
		return accessToken;
	}
	return "";
};

export default function AuthProvider({
	children,
}: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(defaultAuthState());
	const [accessToken, setAccessToken] = useState(getAccessToken());
	// const handleRefreshLogin = () => {
	// 	const refreshToken = getRefreshToken();
	// 	if (refreshToken) {
	// 		fetch("http://localhost:3000/api/auth/refresh_login", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ refreshToken }),
	// 		})
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				if (data.access_token) {
	// 					setAccessToken(data.accessToken);
	// 					setIsAuthenticated(true);
	// 				} else {
	// 					setIsAuthenticated(false);
	// 					// router.push("/login");
	// 				}
	// 			})
	// 			.catch((err) => console.log(err));
	// 	}
	// };

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				accessToken,
				setAccessToken,
				// handleRefreshLogin,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function getRefreshToken(): string {
	const refreshToken: string | null = JSON.parse(
		window.localStorage.getItem("refresh_token") ?? "",
	) as string | null;
	if (refreshToken) {
		return refreshToken;
	}
	return "";
}

export function UseAuthContext(): AuthContextType {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}

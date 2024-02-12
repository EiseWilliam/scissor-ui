"use client";

import React, { useState } from "react";
import RegisterForm from "@/components/signup";
import Link from "next/link";
import { RegisterVector } from "@/components/background-vectors";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/login";
import { Button } from "@/components/ui/button";
import { UseAuthContext } from "@/context/auth-context";

export default function LoginPage() {
	// const router = useRouter();
	const [isSignupForm, setIsSignupForm] = useState(false);
	const handleFormChange = () => {
		setIsSignupForm(!isSignupForm);
		// router.push(isSignupForm ? "/register" : "/login");
	};
	return (
		<div className="flex flex-row items-center justify-center min-h-screen bg-white dark:bg-gray-900">
			<div className="flex flex-col">
				{isSignupForm ? <RegisterForm /> : <LoginForm />}
				<div className="mt-4 text-sm text-center">
					{isSignupForm ? "Already have an account" : "Don't have an account"}?{" "}
					<Button variant="link" className="" onClick={handleFormChange}>
						{isSignupForm ? "Login" : "Sign Up"}
					</Button>
				</div>
			</div>
			<RegisterVector className="w-60 h-60" />
		</div>
	);
}

import React, { type FC, useState } from "react";
import RegisterForm from "@/components/forms/signup";
import { RegisterVector } from "@/components/background-vectors";
import LoginForm from "@/components/forms/login";
import { Button } from "@/components/ui/button";

const AuthPage: FC<boolean> = (isSignUp: boolean) => {
	const [isSignupForm, setIsSignupForm] = useState(isSignUp);
	const handleFormChange = () => {
		setIsSignupForm(!isSignupForm);
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
};

export default AuthPage;

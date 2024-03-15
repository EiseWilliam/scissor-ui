import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { request } from "@/lib/utils";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UseAuthContext } from "@/context/auth-context";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRegisterAndLogin } from "@/services/auth";


const RegisterForm = () => {
	const {
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
	} = useRegisterAndLogin();
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setErr("");
	}, [userEmail, password, ConfirmPassword, setErr]);
	return (
		<Card className="w-fit">
			<form onSubmit={handleSubmit}>
				<CardHeader>
					<CardTitle>Sign Up</CardTitle>
					<CardDescription>
						Create your account by filling out the form below
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
								value={userEmail}
								onChange={(e) => setUserEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								required
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="confirm-password">Confirm Password</Label>
							<Input
								id="confirm-password"
								required
								type="password"
								value={ConfirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
							/>
						</div>
						{err && <p className="text-red-500">{err}</p>}
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					{!isLoading ? (
						<Button className="w-full" type="submit">
							Sign Up
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

export default RegisterForm;

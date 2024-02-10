import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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


async function loginUser(email: string, password: string) {
	const requestData = new URLSearchParams();
	requestData.append('username', email)
	requestData.append('password', password)
	return fetch('http://localhost:8000/api/auth/login', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	  },
	  body: requestData
	})
	//   .then(data => data.json())
   }

export default function LoginForm() {
	const router = useRouter()
	const [userEmail, setUserEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [err, setErr] = useState('');
	const [showPassword, setShowPassword] = useState<boolean>(false)

	

	useEffect(() => {
        setErr('');
    }, [userEmail, password])
	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const response =  await loginUser(userEmail, password)
		if (response.ok) {
			const responseData = response.json()
			localStorage.setItem('token', responseData.access_token);
			localStorage.setItem('refreshToken', refreshToken);
			router.push('/profile')
		  } else {
			setErr("Login Failed")
		  }
	}
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
						{/* <div className="flex flex-col space-y-1.5">
							<Label htmlFor="first-name">First name</Label>
							<Input id="first-name" placeholder="John" required />
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="last-name">Last name</Label>
							<Input id="last-name" placeholder="Doe" required />
						</div> */}
						<div className="flex flex-col space-y-1.5 w-80">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								placeholder="johndoe@example.com"
								required
								type="email"
								name="email"
								value={userEmail}
								onChange={e => setUserEmail(e.target.value)}
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="password">Password</Label>
							<Input id="password" placeholder="Enter password" required type="password" onChange={e => setPassword(e.target.value)}/>
							<Link href="#" className="text-sm ml-auto">
								Forgot Password?
							</Link>
						</div>
					</div>
					
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button className="w-full" type="submit" >
					Sign Up
				</Button>
			</CardFooter>
				</form>
		</Card>
	);
}

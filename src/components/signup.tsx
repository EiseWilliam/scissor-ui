import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ButtonProps } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Select, SelectTrigger } from "./ui/select";


export default function RegisterForm() {
	return (
		<Card className="w-fit">
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>
					Create your account by filling out the form below
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
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
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="password">Password</Label>
							<Input id="password" required type="password" />
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="confirm-password">Confirm Password</Label>
							<Input id="confirm-password" required type="password" />
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button className="w-full" type="submit">
					Sign Up
				</Button>
			</CardFooter>
		</Card>
	);
}

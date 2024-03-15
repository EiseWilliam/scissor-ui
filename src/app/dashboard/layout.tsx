"use client";

import NavBar from "@/components/navbar";
import "@/styles/globals.css";
import AuthProvider, { UseAuthContext } from "@/context/auth-context";
import { Inter } from "next/font/google";
import { DashNavMenu } from "@/components/dashboard";
import SectionProvider from "@/context/section-context";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { ReloadIcon } from '@radix-ui/react-icons';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();
	const { isAuthenticated } = UseAuthContext();
	if (!isAuthenticated) {
		router.push("/login");
		return (
			<main className="flex items-center justify-center">
				<SectionProvider>
					<Alert className="w-[400px] ">
						<Terminal className="h-4 w-4" />
						<AlertTitle>Heads up!</AlertTitle>
						<AlertDescription>
							You are not logged in. Please login to continue.
						</AlertDescription>
						<ReloadIcon className="h-4 w-4 " />
					</Alert>
				</SectionProvider>
			</main>
		);

	}
	return (
		<main className="flex flex-row">
			<SectionProvider>
				<DashNavMenu />
				{children}
			</SectionProvider>
		</main>
	);
}

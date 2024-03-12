import NavBar from "@/components/navbar";
import "@/styles/globals.css";
import AuthProvider from "@/context/auth-context";
import { Inter } from "next/font/google";
import { DashNavMenu } from "@/components/dashboard";
import SectionProvider from "@/context/section-context";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="flex flex-row">
			<SectionProvider>
				<DashNavMenu />
				{children}
			</SectionProvider>
		</main>
	);
}

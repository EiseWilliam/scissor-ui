import NavBar from "@/components/navbar";
import "@/styles/globals.css";
import AuthProvider from "@/context/auth-context";
import { Inter } from "next/font/google";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata = {
	title: "Trim Url shortener",
	description: "Enterprise level url shortenening services for free",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`font-sans ${inter.variable} bg-gradient-to-b from-white to-[#f9efff] min-h-screen min-w-screen`}>
				<AuthProvider>
					<NavBar />
					{children}
				</AuthProvider>
			</body>
		</html>
	);
}

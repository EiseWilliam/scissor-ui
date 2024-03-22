import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Link2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { QrCodeIcon } from "lucide-react";

export function DashNavMenu() {
	// const [isCollasped, setIsCollasped] = useState(false);
	return (
		<div className="flex flex-col w-fit h-screen border-r bg-gray-100/40 lg:block dark:bg-gray-800/40 pr-10">
			<nav className="flex-1 flex flex-col items-start py-4 justify-start gap-1 px-10 text-sm">
				<Button
					variant="link"
					className="w-fit p-0 text-black hover:text-blue-600 text"
				>
					<Link
						className="flex flex-row items-center gap-1.5 text-sm"
						to="/dashboard/urls"
					>
						<Link2Icon className="w-6 h-6" />
						<span className="text-xs font-medium">My Urls</span>
					</Link>
				</Button>
				{/* <Button
					variant="link"
					className="w-fit p-0 text-black hover:text-blue-600 "
				>
					<Link
						className="flex flex-row items-center gap-1.5 text-sm [&.active]:font-bold"
						href="/dashboard/analytics"
					>
						<BarChart2Icon className="w-6 h-6" />
						<span className="text-xs font-medium">Analytics</span>
					</Link>
				</Button> */}
				<Button
					variant="link"
					className="w-fit p-0 text-black hover:text-blue-600 "
				>
					<Link
						className="flex flex-row items-center gap-1.5 text-sm [&.active]:font-bold"
						to="/dashboard/qrs"
						activeProps={{
							className: "font-bold text-blue-600",
						}}
					>
						<QrCodeIcon className="w-6 h-6" />
						<span className="text-xs font-medium">QR Codes</span>
					</Link>
				
				</Button>
			</nav>
		</div>
	);
}


function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Icon</title>
			<path d="m15 18-6-6 6-6" />
		</svg>
	);
}


function HomeIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Icon</title>
			<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
			<polyline points="9 22 9 12 15 12 15 22" />
		</svg>
	);
}

function Package2Icon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<title>Icon</title>
			<path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
			<path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
			<path d="M12 3v6" />
		</svg>
	);
}



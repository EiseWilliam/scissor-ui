"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { useState } from "react";
import { Logo } from "@/components/icons";
import { ChevronDownIcon, Link2Icon } from "@radix-ui/react-icons";
import { UseSectionContext } from "@/context/section-context";

// export function DashHeader(){
//   return (
//     <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
// 					<Link className="lg:hidden" href="#">
// 						<Package2Icon className="h-6 w-6" />
// 						<span className="sr-only">Home</span>
// 					</Link>
// 					<div className="flex-1">
// 						<h1 className="font-semibold text-lg">My Urls</h1>
// 					</div>
// 					<Button
// 						className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
// 						size="icon"
// 						variant="ghost"
// 					>
// 						<ChevronDownIcon className="w-4 h-4" />
// 						<span className="sr-only">Toggle user menu</span>
// 					</Button>
// 				</header>
//   )
// }
export function DashNavMenu() {
  const { activeSection, setActiveSection} = UseSectionContext()
	return (
		<div className="flex flex-col w-fit h-screen border-r hidden bg-gray-100/40 lg:block dark:bg-gray-800/40 pr-10">
			<nav className="flex-1 flex flex-col items-start py-4 justify-start gap-1 px-10 text-sm">
				<Button variant="link" className="w-fit p-0 text-black hover:text-blue-600">
					<Link className="flex flex-row items-center gap-1.5 text-sm" href="#">
						<Link2Icon className="w-6 h-6" />
						<span className="text-xs font-medium">My Urls</span>
					</Link>
				</Button>
				<Button variant="link" className="w-fit p-0 text-black hover:text-blue-600 ">
					<Link className="flex flex-row items-center gap-1.5 text-sm" href="/dashboard/analytics">
						<BarChart2Icon className="w-6 h-6" />
						<span className="text-xs font-medium">Analytics</span>
					</Link>
				</Button>
				<Button variant="link" className="w-fit p-0 text-black hover:text-blue-600 ">
					<Link className="flex flex-row items-center gap-1.5 text-sm" href="#">
						<UsersIcon className="w-6 h-6" />
						<span className="text-xs font-medium">Customers</span>
					</Link>
				</Button>
				<Button variant="link" className="w-fit p-0 text-black hover:text-blue-600 ">
					<Link className="flex flex-row items-center gap-1.5 text-sm" href="#">
						<SettingsIcon className="w-6 h-6" />
						<span className="text-xs font-medium">Settings</span>
					</Link>
				</Button>
			</nav>
		</div>
	);
}
// export default function Component() {
//   return (
//     <div className="flex">

//       <div className="flex flex-col flex-1">
//         <header className="flex items-center h-16 px-4 border-b">
//           <Button className="rounded-full md:hidden" variant="outline">
//             <ChevronLeftIcon className="" />
//             <span className="sr-only">Toggle sidebar</span>
//           </Button>
//           <nav className="hidden ml-6 text-lg font-medium md:flex md:items-center md:gap-5 md:text-sm lg:gap-6">
//             <Link className="font-bold" href="#">
//               Home
//             </Link>
//             <Link className="text-gray-500 dark:text-gray-400" href="#">
//               Analytics
//             </Link>
//             <Link className="text-gray-500 dark:text-gray-400" href="#">
//               Products
//             </Link>
//             <Link className="text-gray-500 dark:text-gray-400" href="#">
//               Customers
//             </Link>
//           </nav>
//           <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
//             <form className="flex-1 ml-auto sm:flex-initial">
//               <div className="relative">
//                 <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
//                 <Input
//                   className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
//                   placeholder="Search orders..."
//                   type="search"
//                 />
//               </div>
//             </form>
//             <Button className="rounded-full" size="icon" variant="ghost">
//               <img
//                 alt="Avatar"
//                 className="rounded-full"
//                 height="32"
//                 src="/placeholder.svg"
//                 style={{
//                   aspectRatio: "32/32",
//                   objectFit: "cover",
//                 }}
//                 width="32"
//               />
//               <span className="sr-only">Toggle user menu</span>
//             </Button>
//           </div>
//         </header>
//         <main className="flex-1 p-4 md:p-6 lg:p-8">
//           <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                 <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//                 <DollarSignIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">$45,231.89</div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">+20.1% from last month</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                 <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
//                 <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">+2350</div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">+180.1% from last month</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                 <CardTitle className="text-sm font-medium">Sales</CardTitle>
//                 <CreditCardIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">+12,234</div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">+19% from last month</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
//                 <CardTitle className="text-sm font-medium">Active Now</CardTitle>
//                 <ActivityIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">+573</div>
//                 <p className="text-xs text-gray-500 dark:text-gray-400">+201 since last hour</p>
//               </CardContent>
//             </Card>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
		</svg>
	);
}

function BarChart2Icon(props: React.SVGProps<SVGSVGElement>) {
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
			<line x1="18" x2="18" y1="20" y2="10" />
			<line x1="12" x2="12" y1="20" y2="4" />
			<line x1="6" x2="6" y1="20" y2="14" />
		</svg>
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

function CreditCardIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<rect width="20" height="14" x="2" y="5" rx="2" />
			<line x1="2" x2="22" y1="10" y2="10" />
		</svg>
	);
}

function DollarSignIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<line x1="12" x2="12" y1="2" y2="22" />
			<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

function SettingsIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
			<circle cx="12" cy="12" r="3" />
		</svg>
	);
}

function ShoppingBagIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
			<path d="M3 6h18" />
			<path d="M16 10a4 4 0 0 1-8 0" />
		</svg>
	);
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
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
			<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
			<circle cx="9" cy="7" r="4" />
			<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
			<path d="M16 3.13a4 4 0 0 1 0 7.75" />
		</svg>
	);
}

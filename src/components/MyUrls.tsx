import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	Card,
} from "@/components/ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { CalendarIcon, Pencil1Icon, CopyIcon } from "@radix-ui/react-icons";

type dataType = {
	shortUrl: string;
	originalUrl: string;
	timestamp?: string;
};
type previewData = {
	title?: string;
	description?: string;
	image?: string;
};

const mockData: Array<dataType> = [
	{
		shortUrl: "link.ly/gh&8jK",
		originalUrl: "https://fontawesome.com/docs/web/use-with/react/",

	},
	{
		shortUrl: "link.ly/gh&pjK",
		originalUrl:
			"https://www.bezkoder.com/react-typescript-authentication-example/#google_vignette",
	},
	{
		shortUrl: "link.ly/gh&pop",
		originalUrl:
			"https://medium.com/@alexprivate2323/next-js-authentication-with-external-api-guide-tutorial-b3cc90c37019",
	},
];

const ShortenedUrlCard = ({ originalUrl, shortUrl, timestamp }: dataType) => {
	return (
		<Card className="flex flex-row p-4 gap-10 w-full">
				<div className="bg-blue-600 rounded-full  text-white h-16 w-16">
					Place Holder for image
				</div>
				<div className="flex flex-col gap-5">
					<div>
						<div className="flex flex-col gap-2">
							<h2 className="text-xl font-bold">Place Holder for Title</h2>
							<p className="text-blue-500 font-medium">{shortUrl}</p>
							<h3 className="text-base  mb-2">{originalUrl}</h3>
						</div>
					</div>
					<div className="flex flex-row gap-2 items-center">
						<CalendarIcon />
						Feb 10, 24
					</div>
				</div>
				<div className="justify-self-end flex-grow flex justify-end">
					<Button variant="outline" className="w-fit rounded-none h-fit p-2">
						<Pencil1Icon className=""/>
            <p className="w-15 h-15 text-sm">Edit</p>
					</Button>
          <Button variant="outline" className="w-fit rounded-none h-fit p-2 gap-2">
						<CopyIcon className=""/>
            <p className="w-15 h-15 text-sm">Copy</p>
					</Button>
				</div>
		</Card>
	);
};
export function MyUrls() {
	return (
		<div className="grid min-h-screen w-full ">
			<div className="flex flex-col w-full">
				<main className=" md:p-6">
					<div className="flex flex-col gap-4">
						{" "}
						{mockData.map((urlData, index) => (
							<ShortenedUrlCard key={urlData.shortUrl} {...urlData} />
						))}
					</div>
				</main>
			</div>
		</div>
	);
}

// function Package2Icon(props) {
// 	return (
// 		<svg
// 			{...props}
// 			xmlns="http://www.w3.org/2000/svg"
// 			width="24"
// 			height="24"
// 			viewBox="0 0 24 24"
// 			fill="none"
// 			stroke="currentColor"
// 			strokeWidth="2"
// 			strokeLinecap="round"
// 			strokeLinejoin="round"
// 		>
// 			<path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
// 			<path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
// 			<path d="M12 3v6" />
// 		</svg>
// 	);
// }

// function BellIcon(props) {
// 	return (
// 		<svg
// 			{...props}
// 			xmlns="http://www.w3.org/2000/svg"
// 			width="24"
// 			height="24"
// 			viewBox="0 0 24 24"
// 			fill="none"
// 			stroke="currentColor"
// 			strokeWidth="2"
// 			strokeLinecap="round"
// 			strokeLinejoin="round"
// 		>
// 			<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
// 			<path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
// 		</svg>
// 	);
// }

// function HomeIcon(props) {
// 	return (
// 		<svg
// 			{...props}
// 			xmlns="http://www.w3.org/2000/svg"
// 			width="24"
// 			height="24"
// 			viewBox="0 0 24 24"
// 			fill="none"
// 			stroke="currentColor"
// 			strokeWidth="2"
// 			strokeLinecap="round"
// 			strokeLinejoin="round"
// 		>
// 			<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
// 			<polyline points="9 22 9 12 15 12 15 22" />
// 		</svg>
// 	);
// }

// function UsersIcon(props) {
// 	return (
// 		<svg
// 			{...props}
// 			xmlns="http://www.w3.org/2000/svg"
// 			width="24"
// 			height="24"
// 			viewBox="0 0 24 24"
// 			fill="none"
// 			stroke="currentColor"
// 			strokeWidth="2"
// 			strokeLinecap="round"
// 			strokeLinejoin="round"
// 		>
// 			<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
// 			<circle cx="9" cy="7" r="4" />
// 			<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
// 			<path d="M16 3.13a4 4 0 0 1 0 7.75" />
// 		</svg>
// 	);
// }

// function PackageIcon(props) {
// 	return (
// 		<svg
// 			{...props}
// 			xmlns="http://www.w3.org/2000/svg"
// 			width="24"
// 			height="24"
// 			viewBox="0 0 24 24"
// 			fill="none"
// 			stroke="currentColor"
// 			strokeWidth="2"
// 			strokeLinecap="round"
// 			strokeLinejoin="round"
// 		>
// 			<path d="m7.5 4.27 9 5.15" />
// 			<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
// 			<path d="m3.3 7 8.7 5 8.7-5" />
// 			<path d="M12 22V12" />
// 		</svg>
// 	);
// }

// function ShoppingCartIcon(props) {
// 	return (
// 		<svg
// 			{...props}
// 			xmlns="http://www.w3.org/2000/svg"
// 			width="24"
// 			height="24"
// 			viewBox="0 0 24 24"
// 			fill="none"
// 			stroke="currentColor"
// 			strokeWidth="2"
// 			strokeLinecap="round"
// 			strokeLinejoin="round"
// 		>
// 			<circle cx="8" cy="21" r="1" />
// 			<circle cx="19" cy="21" r="1" />
// 			<path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
// 		</svg>
// 	);
// }

// function SettingsIcon(props) {
// 	return (
// 		<svg
// 			{...props}
// 			xmlns="http://www.w3.org/2000/svg"
// 			width="24"
// 			height="24"
// 			viewBox="0 0 24 24"
// 			fill="none"
// 			stroke="currentColor"
// 			strokeWidth="2"
// 			strokeLinecap="round"
// 			strokeLinejoin="round"
// 		>
// 			<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
// 			<circle cx="12" cy="12" r="3" />
// 		</svg>
// 	);
// }

// function ChevronDownIcon(props) {
// 	return (
// 		<svg
// 			{...props}
// 			xmlns="http://www.w3.org/2000/svg"
// 			width="24"
// 			height="24"
// 			viewBox="0 0 24 24"
// 			fill="none"
// 			stroke="currentColor"
// 			strokeWidth="2"
// 			strokeLinecap="round"
// 			strokeLinejoin="round"
// 		>
// 			<path d="m6 9 6 6 6-6" />
// 		</svg>
// 	);
// }

// function CircleDollarSignIcon(props) {
// 	return (
// 		<svg
// 			{...props}
// 			xmlns="http://www.w3.org/2000/svg"
// 			width="24"
// 			height="24"
// 			viewBox="0 0 24 24"
// 			fill="none"
// 			stroke="currentColor"
// 			strokeWidth="2"
// 			strokeLinecap="round"
// 			strokeLinejoin="round"
// 		>
// 			<circle cx="12" cy="12" r="10" />
// 			<path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
// 			<path d="M12 18V6" />
// 		</svg>
// 	);
// }

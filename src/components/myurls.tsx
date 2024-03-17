import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { CalendarIcon, CopyIcon, PlusIcon } from "@radix-ui/react-icons";
import { UseAuthContext } from "@/context/auth-context";
import { urlDetails } from "@/lib/types";
import { authenticatedFetcher, axiosRequest, formatDate } from "@/lib/utils";
import React, { type FC, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUrls } from "@/services/query";

interface ShortenedUrlCardProps extends ComponentPropsWithoutRef<"div"> {
	data: urlDetails;
}
export const ShortenedUrlCard: FC<ShortenedUrlCardProps> = ({
	data,
	className,
	...props
}) => {
	return (
		<Card
			className={cn("flex flex-row p-4 gap-10 w-full", className)}
			{...props}
		>
			<div>
				<img
					src={data.thumbnail}
					alt="link preview"
					width={100}
					height={100}
					className="rounded-3xl"
				/>
			</div>
			<div className={cn("flex flex-col gap-5")}>
				<div>
					<div className="flex flex-col gap-2">
						<h2 className="text-slate-800 font-bold text-2xl">{data.title}</h2>
						<p className="text-blue-500 font-medium">{data.short_url}</p>
						<h3 className="text-gray-400 font-sans text-sm font-light">
							{data.original_url}
						</h3>
					</div>
				</div>
				<div className="flex flex-row gap-2 items-center text-slate-700 text-sm">
					<CalendarIcon />
					{formatDate(data.created_at)}
				</div>
			</div>
			<div className="justify-self-end flex-grow flex justify-end">
				{/* <p className="w-15 h-15 text-sm">Edit</p> */}
				<EditButton currentData={data} />

				<Button
					variant="outline"
					className="w-fit rounded-none h-fit p-2 gap-2"
				>
					<CopyIcon className="" />
					<p className="w-15 h-15 text-sm">Copy</p>
				</Button>
			</div>
		</Card>
	);
};

export const MyUrls = () => {
	const { accessToken } = UseAuthContext();
	const { data, error, isLoading } = useQuery({
		queryKey: ['urls', accessToken],
		queryFn: () => fetchUrls(accessToken),
	});
	return (
		<section className="flex flex-col w-full p-2">
			<div className="flex flex-row justify-between items-center p-2">
				<h1 className="text-slate-800 font-bold text-3xl">My Links</h1>
				<Button
					variant="default"
					className=" px-4 text-white bg-blue-600  w-fit"
				>
					<Link
						className="flex flex-row items-center gap-1.5 text-sm"
						href="/dashboard/new"
					>
						<PlusIcon className="w-6 h-6" />
						<span className="text-xs font-medium">New</span>
					</Link>
				</Button>
			</div>
			{isLoading && <p>Loading...</p>}
			{error && <p className="text-red-500">{error.message}</p>}
			{!isLoading && !error && (
				<div className="flex gap-2 flex-col">
					{data.map((data: urlDetails) => (
						<Link
							key={data.id}
							href={`/dashboard/${data.short_url}`}
							className=""
						>
							<ShortenedUrlCard data={data} />
						</Link>
					))}
				</div>
			)}
		</section>
	);
}

export function EditButton({ currentData }) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = true;

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>
					<Button
						variant="outline"
						className="w-fit rounded-none h-fit p-2 gap-2"
					>
						<CopyIcon className="" />
						Edit
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle className="text-2xl">Edit Link</DialogTitle>
					</DialogHeader>
					<ProfileForm currentData={currentData} />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Edit profile</DrawerTitle>
					<DrawerDescription>
						Make changes to your profile here. Click save when you&apos;re done.
					</DrawerDescription>
				</DrawerHeader>
				<ProfileForm className="px-4" currentData={currentData} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function ProfileForm({
	className,
	currentData,
}: React.ComponentProps<"form"> & { currentData: urlDetails }) {
	return (
		<form className={cn("grid items-start gap-4", className)}>
			<div className="grid gap-2">
				<Label htmlFor="title">Title</Label>
				<Input type="text" id="title" defaultValue={currentData.title} />
			</div>
			<div className="grid gap-2">
				<Label htmlFor="custom-alias">Custom Alias</Label>
				<Input id="custom-alias" defaultValue={currentData.short_url} />
			</div>
			<Button type="submit">Save changes</Button>
		</form>
	);
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarIcon, CopyIcon } from "@radix-ui/react-icons";
import type { urlDetails } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import React, {
	type FC,
	type ComponentPropsWithoutRef,
	type FormHTMLAttributes,
	useState,
	type Dispatch,
	type SetStateAction,
} from "react";
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
import {
	BarChart2Icon,
	Edit2Icon,
	EditIcon,
	LucideQrCode,
	Trash2Icon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { InputGroup } from "./forms/form-input";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { UseAuthContext } from "@/context/auth-context";
import ErrorElement from "./ui/error";
import { customAliasIsAvailable, updateUrlDetails } from "@/services/shortener";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";

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
				<div className="flex flex-row gap-5 items-center text-slate-700 text-sm">
					<span className="inline-flex">
						<CalendarIcon />
						{formatDate(data.created_at)}
					</span>
					<Link
						className="inline-flex"
						to="/dashboard/$shortUrl/analytics"
						params={{ shortUrl: data.short_url }}
					>
						<BarChart2Icon className="w-4 h-4" />
						Analytics
					</Link>
					<span className="inline-flex">
						<LucideQrCode className="w-4 h-4" />
						QR Code
					</span>
				</div>
			</div>
			<div className="justify-self-end flex-grow gap-1 flex justify-end">
				{/* <p className="w-15 h-15 text-sm">Edit</p> */}
				<EditButton data={data} />

				<Button
					variant="outline"
					className="w-fit rounded-none h-fit p-2 gap-2"
				>
					<Trash2Icon className="w-4 h-4 " color="red" />
				</Button>
			</div>
		</Card>
	);
};

export const EditButton: React.FC<{ data: urlDetails }> = ({ data }) => {
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
						<Edit2Icon className="w-4 h-4" />
						<p className="text-xs">Edit</p>
					</Button>
				</DialogTrigger>
				<DialogContent className="">
					<DialogHeader>
						<DialogTitle className="text-2xl  font-bold">Edit Link</DialogTitle>
					</DialogHeader>
					<EditLinkForm currentData={data} setOpen={setOpen} />
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
				<EditLinkForm className="px-4" currentData={data} setOpen={setOpen} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

const EditLinkForm: React.FC<
	FormHTMLAttributes<HTMLFormElement> & {
		currentData: urlDetails;
		setOpen: Dispatch<SetStateAction<boolean>>;
	}
> = ({ className, currentData, setOpen }) => {
	const { accessToken } = UseAuthContext();
	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState(null);
	const queryClient = useQueryClient();

	const schema = z.object({
		title: z.string().max(60, "Title cannot exceed 60 characters").optional(),
		alias: z
			.string()
			.optional()
			.refine((alias: string | undefined) => {
				if (!alias) return true;
				return customAliasIsAvailable(alias, accessToken);
			}, "Alias already exists"),
	});
	type ValidationSchemaType = z.infer<typeof schema>;
	const onSubmit: SubmitHandler<ValidationSchemaType> = (data) => {
		setIsLoading(true);
		updateUrlDetails(currentData.short_url, accessToken, {
			title: data.title,
			alias: data.alias,
		})
			.then(() => {
				setIsLoading(false);
				queryClient.invalidateQueries({queryKey: ["urls", accessToken]});
				setOpen(false);
			})
			.catch((err) => {
				setIsLoading(false);
				setErr(err.message);
			});
	};

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ValidationSchemaType>({
		resolver: zodResolver(schema),
	});
	return (
		<form
			className={cn(
				"flex flex-col items-start gap-6 w-fit h-fit pt-6 pb-4",
				className,
			)}
			onSubmit={handleSubmit(onSubmit)}
		>
			<InputGroup
				id="title"
				label="Title"
				type="text"
				placeholder={currentData.title}
				error={errors.title?.message}
				fn={register("title")}
				className="w-full"
			/>
			<div className="flex items-end justify-center gap-2 h-fit">
				<p className="text-slate-800 text-normal h-full font-medium bg-slate-100 rounded-l-sm border-[1px] border-slate-300 py-3 pl-4 pr-3">
					localhost:8000/
				</p>
				<InputGroup
					id="alias"
					label="Custom Back Half"
					type="text"
					placeholder={currentData.short_url}
					error={errors.alias?.message}
					fn={register("alias")}
				/>
			</div>
			{err && <ErrorElement message={err} />}
			<Button className="w-full" type="submit" disabled={isLoading}>
				Save changes
			</Button>
		</form>
	);
};

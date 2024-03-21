import { InputGroup } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import ErrorElement from "@/components/ui/error";
import { UseAuthContext } from "@/context/auth-context";
import type { urlDetails } from "@/lib/types";
import { cn } from "@/lib/utils";
import { customAliasIsAvailable, updateUrlDetails } from "@/services/shortener";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { type FormHTMLAttributes, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const NewLinkForm: React.FC<FormHTMLAttributes<HTMLFormElement> & {}> = ({
	className,
}) => {
	const currentData = {
		title: "string",
		short_url: "string",
	};
	const { accessToken } = UseAuthContext();
	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState(null);
	const schema = z.object({
		title: z.string().max(60, "Title cannot exceed 60 characters").optional(),
		alias: z
			.string()
			// .min(3, "Alias must be at least 3 characters")
			// .max(12, "Alias cannot exceed 12 characters")
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
				onSuccess();
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
		<div className="flex flex-col gap-2 items-center  py-16 w-full">
			<h1 className="text-3xl font-bold">Create New</h1>
			<form
				className={cn(
					"flex flex-col gap-6 h-fit pb-4 w-full  px-48",
					className,
				)}
				onSubmit={handleSubmit(onSubmit)}
			>
				<InputGroup
					id="link"
					label="Link"
					type="url"
					placeholder={currentData.original_url}
					error={errors.link?.message}
					fn={register("link")}
					className="w-full"
				/>
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
				<Button className="sticky" type="submit" disabled={isLoading}>
					Create New Url
				</Button>
			</form>
		</div>
	);
};
export function AShortenerPanel() {
	const { accessToken } = UseAuthContext();
	const [newUrls, setNewUrls] = useState<string[]>([]);
	const [longUrl, setLongUrl] = useState("");
	const [alias, setAlias] = useState("");
	const [aliasAvailable, setAliasAvailable] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const verifyCustom = (alias: string) => {
		fetcher(`/url/verify_custom?alias=${alias}`)
			.then((d) => setAliasAvailable(d))
			.catch((e) => console.log(e));
	};
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setTimeout(() => {
			if (alias.length > 2) {
				verifyCustom(alias);
			}
		}, 1000);
	}, [alias]);
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!longUrl.trim()) {
			setError("Please enter a valid URL");
			return;
		}
		setIsLoading(true);

		request
			.post("/url/shorten", { url: longUrl, custom_alias: alias }, config)
			.then((res) => {
				if (res.status === 200) {
					setIsLoading(false);
				} else {
					setIsLoading(false);
					setError(res.data);
				}
			})
			.catch((error) => {
				setIsLoading(false);
				setError(error.message);
			});
	};
	return (
		<div className="w-full p-8 bg-white min-w-fit h-fit dark:bg-gray-800">
			<div className="flex flex-col items-center justify-center h-full">
				<div className="w-full max-w-md">
					<form className="rounded-md shadow-sm " onSubmit={handleSubmit}>
						<Label htmlFor="long-url">URL</Label>
						<Input
							id="long-url"
							type="url"
							placeholder={error ? error : "Paste long URL here..."}
							value={longUrl}
							onChange={(e) => setLongUrl(e.target.value)}
						/>
						<Label htmlFor="alias">Custom alias(Optional)</Label>
						<Input
							id="alias"
							type="text"
							placeholder={error ? error : "Set a Custom Alias"}
							value={alias}
							onChange={(e) => {
								setAliasAvailable(null);
								setAlias(e.target.value);
							}}
						/>
						<AliasFeedback isAvailable={aliasAvailable} />
						<Label htmlFor="alias">QR code(Optional)</Label>
						<div className="flex items-center space-x-2">
							<Switch id="airplane-mode" />
							<Label htmlFor="airplane-mode">Generate Qr Code</Label>
						</div>
						{!isLoading ? (
							<Button
								className="w-full py-2 mt-4 rounded-b-md"
								type="submit"
								variant="default"
								disabled={aliasAvailable === false}
							>
								Trim Url
							</Button>
						) : (
							<Button disabled className="w-full py-2 mt-4 rounded-b-md">
								<ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
							</Button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}
export default NewLinkForm;

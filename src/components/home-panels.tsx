"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState, memo, type FC } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useCopy } from "@/lib/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { api, fetcher, request } from "@/lib/utils";
import { UseAuthContext } from "@/context/auth-context";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchRecentUrls } from "@/services/query";
import { QrCode, QrCodeIcon } from "lucide-react";
import { RadioGroupItem, RadioGroup} from "./ui/radio-group";
type urlClicks = Record<string, number>;

function RecentURLs() {
	const { accessToken } = UseAuthContext();
	const { copiedText, copy } = useCopy();
	const { data, error, isLoading } = useQuery({
		queryKey: ["recent_urls", accessToken],
		queryFn: () => fetchRecentUrls(accessToken),
	});
	// useEffect(() => {
	// 	const storedUrls = localStorage.getItem("myShortUrls");
	// 	if (storedUrls) {
	// 		const storedData: string[] = JSON.parse(storedUrls) as string[];
	// 		const lastThreeUrls = storedData.slice(-3);
	// 		fetch("http://localhost:8000/api/url/stats", {
	// 			method: "POST",
	// 			headers: {
	// 				accept: "application/json",
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({ short_urls: lastThreeUrls }),
	// 		})
	// 			.then((res) => res.json())
	// 			.then((data) => {
	// 				setIsLoading(false);
	// 				setUrlsData(data);
	// 			})
	// 			.catch((err) => {
	// 				setIsLoading(false);
	// 				setError(err.message);
	// 			});
	// 	} else {
	// 		setIsLoading(false);
	// 	}
	// }, []);

	return (
		<div className="flex items-start flex-col justify-start w-full">
			<h2 className="text-lg font-medium text-left text-gray-900 dark:text-white">
				Your Recent URLs
			</h2>

			<div className="flex flex-col-reverse gap-2 w-full">
				{isLoading && (
					<div className="space-y-2">
						<Skeleton className="p-4 bg-gray-100 rounded-md h-14 dark:bg-gray-700" />
						<Skeleton className="p-4 bg-gray-100 rounded-md h-14 dark:bg-gray-700" />
						<Skeleton className="p-4 bg-gray-100 rounded-md h-14 dark:bg-gray-700" />
					</div>
				)}
				{error && <p className="text-red-500">{error.message}</p>}
				{!isLoading &&
					!error &&
					Object.entries(data as urlClicks).map(([url, clicks]) => (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.9 }}
							key={url}
							className="flex items-center justify-between p-4 bg-gray-100 rounded-md h-14 dark:bg-gray-700"
						>
							<div>
								<p className="text-sm text-gray-900 dark:text-white">{url}</p>
								<p className="text-xs text-gray-500">Clicked {clicks} times</p>
							</div>
							<Button size="sm" variant="ghost" onClick={() => copy(url)}>
								Copy
							</Button>
						</motion.div>
					))}
			</div>
		</div>
	);
}
interface AliasFeedbackProps {
	isAvailable: boolean | null;
}

const AliasFeedback: React.FC<AliasFeedbackProps> = ({ isAvailable }) => {
	return (
		isAvailable !== null &&
		(isAvailable ? (
			<span id="alias-feedback" className="text-sm text-green-500">
				Alias is available
			</span>
		) : (
			<span id="alias-feedback" className="text-sm text-red-500">
				Sorry, this alias is taken
			</span>
		))
	);
};

const MemoRecent = memo(RecentURLs);

export function AuthShortenerPanel() {
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
			.catch((error) => console.log(error));
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
					<form className="rounded-md shadow-sm" onSubmit={handleSubmit}>
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

// export default function ShortenerPanel() {
// 	const { isAuthenticated, accessToken, setIsAuthenticated } = UseAuthContext();
// 	const [newUrls, setNewUrls] = useState<string[]>([]);
// 	const [longUrl, setLongUrl] = useState("");
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState("");

// 	const addValueToArray = (newUrl: string) => {
// 		const storedUrls = localStorage.getItem("myShortUrls");
// 		const updatedUrls = storedUrls ? JSON.parse(storedUrls) : [];
// 		updatedUrls.push(newUrl);
// 		setNewUrls((prevState) => [...prevState, newUrl]);
// 		localStorage.setItem("myShortUrls", JSON.stringify(updatedUrls));
// 		setLongUrl("");
// 	};
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		if (!longUrl.trim()) {
// 			setError("Please enter a valid URL");
// 			return;
// 		}
// 		setIsLoading(true);
// 		fetch(`http://localhost:8000/api/url/quick_shorten?url=${longUrl}`, {
// 			method: "POST",
// 			headers: {
// 				accept: "application/json",
// 				"Content-Type": "application/json",
// 			},
// 		})
// 			.then((res) => {
// 				if (res.ok) return res.json();
// 				setError(res.status.toString());
// 			})
// 			.then((data) => {
// 				setIsLoading(false);
// 				addValueToArray(data);
// 			})
// 			.catch((error) => {
// 				setIsLoading(false);
// 				setError(error.message);
// 			});
// 	};
// 	return (
// 		<div className="w-full p-8 bg-white min-w-fit h-fit dark:bg-gray-800">
// 			<div className="flex flex-col items-center justify-center h-full">
// 				<div className="w-full max-w-md">
// 					<form className="rounded-md shadow-sm" onSubmit={handleSubmit}>
// 						<Label htmlFor="long-url">URL</Label>
// 						<Input
// 							id="long-url"
// 							type="url"
// 							placeholder={error ? error : "Paste long URL here..."}
// 							value={longUrl}
// 							onChange={(e) => setLongUrl(e.target.value)}
// 						/>
// 						{!isLoading ? (
// 							<Button
// 								className="w-full py-2 mt-4 rounded-b-md"
// 								type="submit"
// 								variant="default"
// 							>
// 								Trim Url
// 							</Button>
// 						) : (
// 							<Button disabled className="w-full py-2 mt-4 rounded-b-md">
// 								<ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
// 							</Button>
// 						)}
// 					</form>
// 				</div>
// 				<div className="w-full max-w-md mt-8">
// 					<RecentURLs Urls={newUrls} />
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

export function QRPanel() {
	const { isAuthenticated, accessToken } = UseAuthContext();
	const [isAdvanced, setIsAdvanced] = useState(false);
	// const PlaceholderSVG = (size: number) => {
	// 	return (
	// 		<svg
	// 			width={size}
	// 			height={size}
	// 			viewBox={`0 0 ${size} ${size}`}
	// 			xmlns="http://www.w3.org/2000/svg"
	// 		>
	// 			<title>Placeholder SVG</title>
	// 			<rect x="10" y="10" width="30" height="30" fill="#ccc" />
	// 			<rect x="50" y="10" width="30" height="30" fill="#ccc" />
	// 			<rect x="10" y="50" width="30" height="30" fill="#ccc" />
	// 			<rect x="90" y="10" width="30" height="30" fill="#ccc" />
	// 			<rect x="90" y="50" width="30" height="30" fill="#ccc" />
	// 			<rect x="90" y="90" width="30" height="30" fill="#ccc" />
	// 		</svg>
	// 	);
	// };

	const [url, setUrl] = useState("");
	const [qr, setQr] = useState(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetch(
			`https://scissor-api-bosc.onrender.com/api/url/quick_qr?url=${url}&is_short_url=false`,
			{
				method: "POST",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					color: "blue",
				}),
			},
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.text();
			})
			.then((data) => {
				setQr(data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(
					"There has been a problem with your fetch operation:",
					error,
				);
				setIsLoading(false);
			});
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>QR Code</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="rounded-md shadow-sm">
						<Label htmlFor="long-url">URL</Label>
						<Input
							id="long-url"
							type="url"
							placeholder="Paste URL here..."
							onChange={(e) => setUrl(e.target.value)}
						/>
					</div>
					<IsAdvancedCheckbox
						isAdvanced={isAdvanced}
						setIsAdvanced={setIsAdvanced}
					/>
					{error && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.9 }}
							className="flex items-center pl-4 py-2 w-full ml-0 gap-2 text-sm rounded-md bg-yellow-100 text-destructive"
						>
							{/* <ExclamationTriangleIcon/>  */}
							{error}
						</motion.p>
					)}
					{isAdvanced && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.9 }}
						>
							<Label htmlFor="color">Color</Label>
							<RadioGroup defaultValue="black" className="flex flex-row">
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="black" id="r1" className="bg-black h-8 w-8 rounded-md border-none" />
									{/* <Label htmlFor="r1">black</Label> */}
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="blue" id="r2" className="bg-blue-500 h-8 w-8 rounded-md border-none"/>
									{/* <Label htmlFor="r2">blue</Label> */}
								</div>
								<div className="flex items-center space-x-2">
									<RadioGroupItem value="red" id="r3" className="bg-red-600 h-8 w-8 rounded-md border-none" />
									{/* <Label htmlFor="r3">red</Label> */}
								</div>
							</RadioGroup>
						</motion.div>
					)}

					{!isLoading ? (
						<Button
							className="w-full py-2 mt-4 rounded-b-md"
							type="submit"
							variant="default"
						>
							Generate QR Code
						</Button>
					) : (
						<Button disabled className="w-full py-2 mt-4 rounded-b-md">
							<ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
						</Button>
					)}
				</form>
			</CardContent>
			<CardFooter className="flex items-center justify-center">
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
				{qr ? (
					<div
						className="rounded-lg"
						dangerouslySetInnerHTML={{ __html: qr }}
					/>
				) : (
					<QrCode className="w-full bg-opacity-40" size={300} />
				)}
			</CardFooter>
		</Card>
	);
}

const IsAdvancedCheckbox: FC<{
	isAdvanced: boolean;
	setIsAdvanced: (arg0: boolean) => void;
}> = ({ isAdvanced, setIsAdvanced }) => {
	const { isAuthenticated } = UseAuthContext();
	const [showWarning, setShowWarning] = useState(false); // State to manage warning

	const toggle = () => {
		if (!isAuthenticated) {
			setShowWarning(true);
			setTimeout(() => {
				setShowWarning(false);
			}, 3000);
		} else {
			setIsAdvanced(!isAdvanced);
		}
	};
	return (
		<div className="flex flex-col items-start py-2 my-2">
			<div className="flex items-center gap-2">
				<Checkbox id="terms" checked={isAdvanced} onClick={toggle} />
				<label
					htmlFor="terms"
					className="text-sm leading-none text-slate-600 font-sm"
				>
					Show advanced options
				</label>
			</div>
			{showWarning && (
				<motion.p
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.9 }}
					className="flex items-center pl-4 py-2 w-full ml-0 gap-2 text-sm rounded-md bg-destructive/20 text-destructive"
				>
					{/* <ExclamationTriangleIcon/>  */}
					Login to use advanced options
				</motion.p>
			)}
		</div>
	);
};

export const UrlShortener = () => {
	const { accessToken } = UseAuthContext();
	const [longUrl, setLongUrl] = useState("");
	const [alias, setAlias] = useState("");
	const [aliasAvailable, setAliasAvailable] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [newUrls, setNewUrls] = useState<string[]>([]);
	const [isAdvanced, setIsAdvanced] = useState(false);
	const queryClient = useQueryClient();

	const verifyCustom = (alias: string) => {
		fetcher(`/url/verify_custom?alias=${alias}`)
			.then((d) => setAliasAvailable(d))
			.catch((e) => console.log(e));
	};

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

		try {
			if (isAdvanced) {
				const res = await api.post(
					"/url/shorten",
					{ url: longUrl, custom_alias: alias },
					config,
				);
				if (res.status === 200) {
					queryClient.invalidateQueries({
						queryKey: ["recent_urls", accessToken],
					});
				} else {
					setError(res.data);
				}
			} else {
				setError(
					"Service currently unavailable for unauthenticated users, Please login",
				);
				// const res = await fetch(
				// 	`https://scissor-api-bosc.onrender.com/api/url/quick_shorten?url=${longUrl}`,
				// );
				// if (res.ok) {
				// 	const data = await res.json();
				// 	// addValueToArray(data); // ... handle successful simple shortening
				// } else {
				// 	setError(res.status.toString());
				// }
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>URL Shortener</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="rounded-md shadow-sm" onSubmit={handleSubmit}>
					<Label htmlFor="long-url">URL</Label>
					<Input
						id="long-url"
						type="url"
						placeholder={error ? error : "Paste long URL here..."}
						value={longUrl}
						onChange={(e) => setLongUrl(e.target.value)}
					/>
					<IsAdvancedCheckbox
						isAdvanced={isAdvanced}
						setIsAdvanced={setIsAdvanced}
					/>
					{error && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.9 }}
							className="flex items-center pl-4 py-2 w-full ml-0 gap-2 text-sm rounded-md bg-yellow-100 text-destructive"
						>
							{/* <ExclamationTriangleIcon/>  */}
							{error}
						</motion.p>
					)}
					{isAdvanced && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.9 }}
						>
							<Label htmlFor="alias">Custom alias(Optional)</Label>
							<div className="flex flex-row items-center">
								<p className="text-slate-800 text-normal font-sm">
									scissor-api-bosc.onrender.com/
								</p>
								<span className="inline-flex flex-col w-full pl-1">
									<Input
										id="alias"
										type="text"
										placeholder={error ? error : "Set a Custom Alias"}
										value={alias}
										className="w-full"
										onChange={(e) => {
											setAliasAvailable(null);
											setAlias(e.target.value);
										}}
									/>
									<AliasFeedback isAvailable={aliasAvailable} />
								</span>
							</div>
						</motion.div>
					)}
					{!isLoading ? (
						<Button
							className="w-full py-2 mt-4 rounded-b-md"
							type="submit"
							variant="default"
							disabled={isAdvanced && aliasAvailable === false}
						>
							Trim Url
						</Button>
					) : (
						<Button
							className="w-full py-2 mt-4 rounded-b-md"
							type="submit"
							variant="default"
							disabled={isAdvanced && aliasAvailable === false}
						>
							Trim Url
						</Button>
					)}
				</form>
			</CardContent>
			<CardFooter className="flex items-center justify-center">
				<RecentURLs />
			</CardFooter>
		</Card>
	);
};

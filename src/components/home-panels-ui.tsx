"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useEffect, useState, useMemo, memo } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { useCopy } from "@/lib/hooks";
import { Skeleton } from "@/components/ui/skeleton";
import useSWRImmutable from "swr";
import { api, fetcher, request } from "@/lib/utils";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { UseAuthContext } from "@/context/auth-context";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
type urlClicks = Record<string, number>;

function RecentURLs() {
	const [urlsData, setUrlsData] = useState<urlClicks>({});
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [copiedText, copy, recentlyCopied] = useCopy();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const storedUrls = localStorage.getItem("myShortUrls");
		if (storedUrls) {
			const storedData = JSON.parse(storedUrls);
			const lastThreeUrls = storedData.slice(-3);
			fetch("http://localhost:8000/api/url/stats", {
				method: "POST",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ short_urls: lastThreeUrls }),
			})
				.then((res) => res.json())
				.then((data) => {
					setIsLoading(false);
					setUrlsData(data);
				})
				.catch((err) => {
					setIsLoading(false);
					setError(err.message);
				});
		} else {
			setIsLoading(false);
		}
	}, []);

	return (
		<div>
			<h2 className="text-lg text-left font-medium text-gray-900 dark:text-white">
				Your Recent URLs
			</h2>

			<div className="flex gap-2 flex-col-reverse  space-y-4">
				{isLoading && (
					<div className="space-y-2">
						<Skeleton className="h-14 p-4 bg-gray-100 rounded-md dark:bg-gray-700" />
						<Skeleton className="h-14 p-4 bg-gray-100 rounded-md dark:bg-gray-700" />
						<Skeleton className="h-14 p-4 bg-gray-100 rounded-md dark:bg-gray-700" />
					</div>
				)}
				{error && <p className="text-red-500">{error}</p>}
				{!isLoading &&
					!error &&
					Object.entries(urlsData).map(([url, clicks]) => (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.9 }}
							key={url}
							className="flex h-14 items-center justify-between p-4 bg-gray-100 rounded-md dark:bg-gray-700"
						>
							<div>
								<p className="mb-1 text-sm text-gray-900 dark:text-white">
									{url}
								</p>
								<p className="text-xs text-gray-500">Clicked {clicks} times</p>
							</div>
							<Button size="sm" variant="ghost" onClick={() => copy(url)}>
								{recentlyCopied ? "Copy" : "Copied ⚡"}
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
export function AShortenerPanel() {
	const { accessToken } = UseAuthContext();
	const [newUrls, setNewUrls] = useState<string[]>([]);
	const [longUrl, setLongUrl] = useState("");
	const [alias, setAlias] = useState("");
	const [aliasAvailable, setAliasAvailable] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const verifyCustom = (alias: string) => {
		fetcher(`/url/verify_custom?alias=${alias}`).then((d) =>
			setAliasAvailable(d),
		).catch((e) => console.log(e));
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
		<div className="p-8 bg-white w-full min-w-fit h-fit dark:bg-gray-800">
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
								<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							</Button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}

export function AuthShortenerPanel() {
	const { accessToken } = UseAuthContext();
	const [newUrls, setNewUrls] = useState<string[]>([]);
	const [longUrl, setLongUrl] = useState("");
	const [alias, setAlias] = useState("");
	const [aliasAvailable, setAliasAvailable] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const verifyCustom = (alias: string) => {
		fetcher(`/url/verify_custom?alias=${alias}`).then((d) =>
			setAliasAvailable(d),
		).catch(error => console.log(error));
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
		<div className="p-8 bg-white w-full min-w-fit h-fit dark:bg-gray-800">
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
								<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							</Button>
						)}
					</form>
				</div>
			</div>
		</div>
	);
}

export function UrlShortener() {
	const { isAuthenticated, accessToken } = UseAuthContext();
	const [isAdvanced, setIsAdvanced] = useState(false);
	const [longUrl, setLongUrl] = useState("");
	const [alias, setAlias] = useState("");
	const [aliasAvailable, setAliasAvailable] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [newUrls, setNewUrls] = useState<string[]>([]);

	const verifyCustom = (alias: string) => {
		fetcher(`/url/verify_custom?alias=${alias}`).then((d) =>
			setAliasAvailable(d),
		).catch((e) => console.log(e));
	};

	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const handleAdvancedToggle = () => {
		setIsAdvanced(!isAdvanced);
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
				const res = api.post(
					"/url/shorten",
					{ url: longUrl, custom_alias: alias },
					config,
				);
				if (res.status === 200) {
					// ... handle successful advanced shortening
				} else {
					setError(res.data);
				}
			} else {
				const res = await fetch(
					`http://localhost:8000/api/url/quick_shorten?url=${longUrl}`,
				);
				if (res.ok) {
					const data = await res.json();
					// addValueToArray(data); // ... handle successful simple shortening
				} else {
					setError(res.status.toString());
				}
			}
		} catch (error) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};


	return (
		<div className="p-8 bg-white w-full min-w-fit h-fit dark:bg-gray-800">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-lg font-medium text-gray-900 dark:text-white">
					URL Shortener
				</h2>
			</div>
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
						<div className="flex items-center space-x-2 my-2 py-2">
							<Checkbox
								id="terms"
								disabled={isAuthenticated === false}
								checked={isAdvanced}
								onClick={() => {
									setIsAdvanced(!isAdvanced);
								}}
							/>
							<label
								htmlFor="terms"
								className="text-sm text-sky-400 font-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Show advanced options
							</label>
						</div>
						{isAdvanced && (
							<motion.div initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.9 }}>
								<Label htmlFor="alias">Custom alias(Optional)</Label>
								<div className="flex flex-row items-center">
									<p className="text-slate-800 text-normal font-sm">
										localhost:8000/
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
				</div>
			</div>
			<RecentURLs />
		</div>
	);
}

export default function ShortenerPanel() {
	const { isAuthenticated, accessToken, setIsAuthenticated } = UseAuthContext();
	const [newUrls, setNewUrls] = useState<string[]>([]);
	const [longUrl, setLongUrl] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const addValueToArray = (newUrl: string) => {
		const storedUrls = localStorage.getItem("myShortUrls");
		const updatedUrls = storedUrls ? JSON.parse(storedUrls) : [];
		updatedUrls.push(newUrl);
		setNewUrls((prevState) => [...prevState, newUrl]);
		localStorage.setItem("myShortUrls", JSON.stringify(updatedUrls));
		setLongUrl("");
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!longUrl.trim()) {
			setError("Please enter a valid URL");
			return;
		}
		setIsLoading(true);
		fetch(`http://localhost:8000/api/url/quick_shorten?url=${longUrl}`, {
			method: "POST",
			headers: {
				accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				if (res.ok) return res.json();
				setError(res.status.toString());
			})
			.then((data) => {
				setIsLoading(false);
				addValueToArray(data);
			})
			.catch((error) => {
				setIsLoading(false);
				setError(error.message);
			});
	};
	return (
		<div className="p-8 bg-white w-full min-w-fit h-fit dark:bg-gray-800">
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
						{!isLoading ? (
							<Button
								className="w-full py-2 mt-4 rounded-b-md"
								type="submit"
								variant="default"
							>
								Trim Url
							</Button>
						) : (
							<Button disabled className="w-full py-2 mt-4 rounded-b-md">
								<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							</Button>
						)}
					</form>
				</div>
				<div className="w-full max-w-md mt-8">
					<RecentURLs Urls={newUrls} />
				</div>
			</div>
		</div>
	);
}

export function QRPanel() {
	const { isAuthenticated, accessToken } = UseAuthContext();
	const [isAdvanced, setIsAdvanced] = useState(false);
	const PlaceholderSVG = (size: number) => {
		return (
			<svg
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Placeholder SVG</title>
				<rect x="10" y="10" width="30" height="30" fill="#ccc" />
				<rect x="50" y="10" width="30" height="30" fill="#ccc" />
				<rect x="10" y="50" width="30" height="30" fill="#ccc" />
				<rect x="90" y="10" width="30" height="30" fill="#ccc" />
				<rect x="90" y="50" width="30" height="30" fill="#ccc" />
				<rect x="90" y="90" width="30" height="30" fill="#ccc" />
			</svg>
		);
	};

	const [url, setUrl] = useState("");
	const [qr, setQr] = useState(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		fetch(
			`http://localhost:8000/api/url/quick_qr?url=${url}&is_short_url=false`,
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
					<div className="flex items-center space-x-2 my-2 py-2">
							<Checkbox
								id="terms"
								disabled={isAuthenticated === false}
								checked={isAdvanced}
								onClick={() => {
									setIsAdvanced(!isAdvanced);
								}}
							/>
							<label
								htmlFor="terms"
								className="text-sm text-sky-400 font-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								Show advanced options
							</label>
						</div>

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
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
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
					<PlaceholderSVG size={400} />
				)}
			</CardFooter>
		</Card>
	);
}

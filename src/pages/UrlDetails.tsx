import { Overview } from "@/components/analytics";
import { ShortenedUrlCard } from "@/components/myurls";
import QRCodeGenerator from "@/components/qrcode-ui";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UseAuthContext } from "@/context/auth-context";
import { fetchUrlDetails, fetchUrls } from "@/services/query";
import type { overviewData } from "@/types/analytics";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { FC } from "react";

export const UrlsDetailsPage: FC<{ shortUrl: string }> = ({ shortUrl }) => {
	const { accessToken } = UseAuthContext();
	const { data, error, isLoading } = useQuery({
		queryKey: ["urls", accessToken],
		queryFn: () => fetchUrlDetails(shortUrl, accessToken),
	});
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!data) return <div>No data</div>;
	return (
		<div className="w-full max-h-fit bg-white rounded-lg shadow-lg p-6">
			<ShortenedUrlCard data={data} />
			<div className="flex fex-row gap-2">
				<QRCodeGenerator />
				<QuickStats {...data}/>
			</div>
			<button
				type="button"
				className="bg-white text-blue-600 font-sans font-medium py-2 px-4 rounded"
			>
				<Link to="/dashboard/$shortUrl/analytics"  params={{ shortUrl }} >View full analytics &gt; &gt; </Link>
			</button>
		</div>
	);
};

const QRCode = () => {
	return (
		<div className="bg-white w-1/2">
			<div className="text-slate-800 font-bold">QR Code</div>
			<Card>
				<CardHeader>
					<CardTitle className="text-gray-900 text-2xl font-bold">
						Overview
					</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-row justify-between">
					<p>Scans</p>
					<span className="flex-grow">312</span>
				</CardContent>
				<CardContent>
					<p>Clicks</p>
				</CardContent>
				<CardContent>
					<p>Total Engagement</p>
				</CardContent>
				<CardFooter>
					<CardDescription>Jan 10 - Feb 22</CardDescription>
				</CardFooter>
			</Card>
		</div>
	);
};

const QuickStats = (data: overviewData) => {
	return (
		<div className="bg-white w-1/2">
			<div className="text-slate-800 font-bold">Quick Stats</div>
			<Overview data={data} className="w-full h-fit text-red-600" />
		</div>
	);
};


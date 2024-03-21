import {
	LocationTable,
	Overview,
	Timeline,
	LocationMap,
	Referrer,
} from "@/components/analytics";
import { UseAuthContext } from "@/context/auth-context";
import { fetchAnalytics } from "@/services/query";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import type React from "react";
type analyticsProps = {
	shortUrl: string;
};
const AnalyticsPage: React.FC<analyticsProps> = ({ shortUrl }) => {
	const { accessToken } = UseAuthContext();
	const { data, error, isLoading } = useQuery({
		queryKey: ["analytics", accessToken],
		queryFn: () => fetchAnalytics(shortUrl, accessToken),
		refetchOnWindowFocus: true,
		staleTime: 1000,
	});
	return (
		<div className="py-2 flex flex-col gap-2 w-screen ">
			<div className="flex items-center flex-row gap-10">
				<ChevronLeftIcon />
				<h1 className="text-4xl font-bold">Analytics</h1>
			</div>
			<div className="flex flex-col gap-2 px-10 h-fit  w-full">
				{!isLoading && !error && data && (
					<>
						<Overview
							data={data.overview}
							className="w-full h-fit text-red-600"
						/>
						<Timeline
							data={data.timeline}
							className="w-full bg-white rounded-lg shadow-md p-4"
						/>
						<div className="flex lg:flex-row flex-col gap-2 w-full">
							<LocationMap data={data.location} className="w-full" />
							<LocationTable data={data.location} className=" w-full" />
						</div>

						<Referrer />
					</>
				)}
			</div>
		</div>
	);
};

export default AnalyticsPage;

import { ShortenedUrlCard } from "@/components/myurls";
import { Button } from "@/components/ui/button";
import { UseAuthContext } from "@/context/auth-context";
import type { urlDetails } from "@/lib/types";
import { fetchUrls } from "@/services/query";
import { PlusIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export const UrlsListPage = () => {
	const { accessToken } = UseAuthContext();
	const { data, error, isLoading } = useQuery({
		queryKey: ['urls', accessToken],
		queryFn: () => fetchUrls(accessToken),
	});
	console.log(data)
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
						to="/dashboard/new"
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
					{data.urls.map((data: urlDetails) => (
						<Link
							key={data.id}
							to={`/dashboard/urls/${data.short_url}`}
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
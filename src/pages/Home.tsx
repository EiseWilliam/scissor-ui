import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { FunctionComponent } from "@/lib/types";
import { Link2Icon } from "@radix-ui/react-icons";
import { QRPanel, UrlShortener } from "@/components/home-panels";
import { ShortenLinkVector } from "@/components/background-vectors";

export const Home = (): FunctionComponent => {
	return (
		// <div className="flex min-h-full flex-col items-center justify-center ">
		// 	<div className="flex flex-col items-center justify-center gap-8 ">
		// 		<h1 className="text-5xl font-extrabold tracking-tight text-gray-950 sm:text-[5rem]">
		// 			Scissor <span className="text-blue-600">URL</span> Shortener
		// 		</h1>
		// 		<div className="flex items-center gap-1 justify-around">
		// 			<Tabs defaultValue="short" className="flex flex-row min-w-fit">
		// 				<TabsList className="flex flex-col gap-2 h-full min-w-fit bg-transparent">
		// 					<TabsTrigger
		// 						value="short"
		// 						className="rounded-l-lg rounded-none w-full inline-flex gap-2"
		// 					>
		// 						<Link2Icon />
		// 						Shorten link
		// 					</TabsTrigger>
		// 					<TabsTrigger value="qrcode" className="rounded-none w-full">
		// 						QR code
		// 					</TabsTrigger>
		// 				</TabsList>
		// 				<TabsContent value="short" className="w-[400px]">
		// 					<UrlShortener />
		// 				</TabsContent>
		// 				<TabsContent value="qrcode" className="w-[400px]">
		// 					<QRPanel />
		// 				</TabsContent>
		// 			</Tabs>
		// 			<ShortenLinkVector className="h-60 w-60" />
		// 		</div>
		// 	</div>
		// </div>
		<div className="flex min-h-full flex-col items-center justify-center">
			<div className="flex flex-col items-center justify-center gap-4 sm:gap-8">
				<h1
					className="text-3xl font-extrabold tracking-tight text-gray-950 
                   sm:text-5xl lg:text-[5rem]"
				>
					Scissor <span className="text-blue-600">URL</span> Shortener
				</h1>

				<div className="flex flex-col sm:flex-row items-center gap-1 justify-around">
					<Tabs defaultValue="short" className="flex flex-row min-w-fit">
						<TabsList className="flex flex-col gap-2 h-full min-w-fit bg-transparent">
							<TabsTrigger
								value="short"
								className="rounded-l-lg rounded-none w-full inline-flex gap-2"
							>
								<Link2Icon />
								Shorten link
							</TabsTrigger>
							<TabsTrigger value="qrcode" className="rounded-none w-full">
								QR code
							</TabsTrigger>
						</TabsList>
						<TabsContent value="short" className="w-[400px]">
							<UrlShortener />
						</TabsContent>
						<TabsContent value="qrcode" className="w-[400px]">
							<QRPanel />
						</TabsContent>
					</Tabs>

					<ShortenLinkVector className="h-40 w-40 -z-1 sm:w-60" />
				</div>
			</div>
		</div>
	);
};

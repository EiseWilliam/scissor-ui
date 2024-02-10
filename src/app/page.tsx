import { ShortenLinkVector } from "@/components/background-vectors";
import NavBar from "@/components/navbar";
import ShortenerPanel from "@/components/shortner-ui";
import Link from "next/link";

export default function HomePage() {
	return (
		<>

			<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-[#f9efff]">
				<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
					<h1 className="text-5xl font-extrabold tracking-tight text-gray-950 sm:text-[5rem]">
						Scissor <span className="text-blue-600">URL</span> Shortener
					</h1>
					<div className="flex items-center justify-around">
						<ShortenerPanel />
						<ShortenLinkVector className="h-60 w-60" />
					</div>
				</div>
			</main>
		</>
	);
}

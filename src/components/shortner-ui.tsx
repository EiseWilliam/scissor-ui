import {
	SelectValue,
	SelectTrigger,
	SelectItem,
	SelectGroup,
	SelectContent,
	Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';

function RecentURL() {
	return (
		<div className="flex items-center justify-between p-4 bg-gray-100 rounded-md dark:bg-gray-700">
			<div>
				<p className="mb-1 text-sm text-gray-900 dark:text-white">
					short.ly/3rFg4
				</p>
				<p className="text-xs text-gray-500">Clicked 24 times</p>
			</div>
			<Button size="sm" variant="ghost">
				Copy
			</Button>
		</div>
	);
}

export default function ShortenerPanel() {
	return (
		<div className="p-8 bg-white w-full min-w-fit h-fit dark:bg-gray-800">
			<div className="flex flex-col items-center justify-center h-full">
				<div className="w-full max-w-md">
					<div className="rounded-md shadow-sm">
					<Label htmlFor="long-url">URL</Label>
						<Input id="long-url" type="url" placeholder="Paste long URL here..." />
					</div>

					<Button
						className="w-full py-2 mt-4 rounded-b-md"
						type="submit"
						variant="default"
					>
						Trim Url
					</Button>
				</div>
				<div className="w-full max-w-md mt-8">
					<h2 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
						Your Shortened URLs
					</h2>
					<div className="space-y-4">
						<RecentURL />
					</div>
				</div>
			</div>
		</div>
	);
}

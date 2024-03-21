import type React from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WMap from "@/components/world-map";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import type {
	dict,
	locationData,
	overviewData,
	timelineData,
} from "@/types/analytics";
import { cn } from "@/lib/utils";

interface CardProps<DataType> extends React.HTMLAttributes<HTMLDivElement> {
	data: DataType;
}
export const Timeline: React.FC<CardProps<timelineData>> = ({
	data,
	...props
}) => {
	const options: Intl.DateTimeFormatOptions = {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	};
	const formatDate = (
		dateStr: string,
		opts: Intl.DateTimeFormatOptions = options,
	) => new Date(dateStr).toLocaleDateString("en-US", opts);
	const chartData = Object.entries(data.count).map(
		([timestamp, clicks]: [string, number]) => ({
			date: formatDate(timestamp),
			clicks: clicks,
		}),
	);
	return (
		<div {...props}>
			<h2 className="text-xl font-bold mb-4">Clicks and Scan Timeline</h2>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart
					data={chartData}
					margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
				>
					<XAxis dataKey="date" stroke="#8884d8" />
					<YAxis stroke="#8884d8" />
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					{/* <CartesianGrid strokeDasharray="3 3" /> */}
					<Tooltip />
					<Line
						type="monotone"
						dataKey="clicks"
						stroke="#8884d8"
						strokeWidth={2}
						dot={{ stroke: "#8884d8", strokeWidth: 2 }}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export const Overview: React.FC<CardProps<overviewData>> = ({
	data,
	...props
}) => {
	return (
		<Card {...props}>
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
				<p>Clicks {data.clicks}</p>
			</CardContent>
			<CardContent>
				<p>Total Engagement</p>
			</CardContent>
			<CardFooter>
				<CardDescription>Jan 10 - Feb 22</CardDescription>
			</CardFooter>
		</Card>
	);
};

export const LocationMap: React.FC<CardProps<locationData>> = ({
	data,
	...props
}) => {
	return (
		<Card {...props} className="col-span-2">
			<CardHeader>
				<CardTitle className="text-gray-900 text-2xl font-bold">
					Activities by Location
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-row justify-between">
				<WMap data={data.country_codes} className="bg-slate-100 rounded-3xl" />
			</CardContent>
			<CardFooter>
				<CardDescription>Jan 10 - Feb 22</CardDescription>
			</CardFooter>
		</Card>
	);
};

export const LocationTable: React.FC<CardProps<locationData>> = ({
	data,
	className,
}) => {
	return (
		<Card className={cn("w-fit", className)}>
			<CardHeader>
				<CardTitle className="text-gray-900 text-2xl font-bold">
					Activities by Location
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-row justify-between">
				<Tabs defaultValue="countries">
					<TabsList className="grid grid-cols-2">
						<TabsTrigger value="countries">Countries</TabsTrigger>
						<TabsTrigger value="cities">Cities</TabsTrigger>
					</TabsList>
					<TabsContent value="countries">
						<CountriesTable data={data.countries} />
					</TabsContent>
					<TabsContent value="cities">
						<CitiesTable data={data.cities} />
					</TabsContent>
				</Tabs>
			</CardContent>
			<CardFooter>
				<CardDescription>Jan 10 - Feb 22</CardDescription>
			</CardFooter>
		</Card>
	);
};

export const CountriesTable: React.FC<{ data: dict }> = ({ data }) => {
	return (
		<Table>
			<TableCaption>Countries by Visit</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="">Country</TableHead>
					<TableHead>clicks & scans</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Object.entries(data).map(([key, value]) => (
					<TableRow key={key}>
						<TableCell>{key}</TableCell>
						<TableCell>{value}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
export const CitiesTable: React.FC<{ data: dict }> = ({ data }) => {
	return (
		<Table>
			<TableCaption>Cities by Visit</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="">Country</TableHead>
					<TableHead>clicks & scans</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Object.entries(data).map(([key, value]) => (
					<TableRow key={key}>
						<TableCell>{key}</TableCell>
						<TableCell>{value}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

interface DataPoint {
	name: string;
	value: number;
}

const data: DataPoint[] = [
	{ name: "LinkedIn", value: 40 },
	{ name: "Facebook", value: 22 },
	{ name: "Google", value: 18 },
	{ name: "Twitter", value: 12 },
	{ name: "Bing", value: 8 },
	{ name: "Direct", value: 6 },
	{ name: "Other", value: 2 },
];

export const Referrer: React.FC = () => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4">
			<h2 className="text-xl font-bold mb-4">Clicks + scans by referrer</h2>
			<ResponsiveContainer width="50%" height={400}>
				<BarChart
					width={600}
					height={300}
					data={data}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="name" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Bar dataKey="value" fill="#8884d8" />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
};

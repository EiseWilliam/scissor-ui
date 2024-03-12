"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Bar, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { BarChart } from '@tremor/react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WMap from "@/components/world-map";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Divide } from "lucide-react";
import useSWR from 'swr';
interface ApiReturnData {
	overview: overviewData;
	timeline: timelineData;
	referrers: referrersData;
	location: locationData;
}

export type overviewData = {
	clicks: number;
	scans: number;
	last_activity: string;
	total_engagement: number;
};
type dict = {
	[key: string]: number;
};
type timelineData = {
	count: dict;
};
type referrersData = dict;

type locationData = {
	countries: dict;
	cities: dict;
	country_codes: dict;
};
// async function getData(): Promise<ApiReturnData> {
// 	try {
// 		const res = await fetch("http://localhost:8000/api/analytics/8wiCzrs",{ 
// 			cache: 'no-store' 
// 		});
// 		const data = await res.json();
// 		return data as ApiReturnData;
// 	} catch (err) {
// 		alert(err);
// 	}
// }
function Analytics() {
	const fetcher = (...args: any[]) => fetch(args[0]).then((res) => res.json());
	const { data, error, isLoading } = useSWR<ApiReturnData>('http://localhost:8000/api/analytics/8wiCzrs', fetcher);
	return (
		<div className="py-2 flex flex-col gap-2 w-screen ">
			<div className="flex items-center flex-row gap-10">
				<ChevronLeftIcon />
				<h1 className="text-4xl font-bold">Analytics</h1>
			</div>
			<div className="flex flex-col gap-2 px-10 h-fit  w-full">
				{!isLoading && !error && data && (
					<>
						<Overview data={data.overview} className="w-full h-fit tesxt-red-600" />
						<Timeline data={data.timeline} className="w-full bg-white rounded-lg shadow-md p-4" />
						<LocationMap data={data.location} className="col-span-2" />
						<LocationTable data={data.location} />
						<Referrer />
					</>
				)}
			</div>
		</div>
	);

}


export default Analytics;

interface CardProps<DataType> {
	className?: string;
	data: DataType;
}
const Timeline: React.FC<CardProps<timelineData>> = ({ data, ...props }) => {
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'short',
		year: 'numeric',
		month: 'short',
		day: 'numeric'
	};
	const formatDate = (dateStr: string, opts: Intl.DateTimeFormatOptions = options) => new Date(dateStr).toLocaleDateString('en-US', opts);
	const chartData = Object.entries(data.count).map(([timestamp, clicks]: [string, number]) => ({
		date: formatDate(timestamp),
		clicks: clicks
	}));
	return (
		<div className={props.className}>
			<h2 className="text-xl font-bold mb-4">Clicks and Scan Timeline</h2>
			<ResponsiveContainer width="100%" height={300}>
				<LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
					<XAxis dataKey="date" stroke="#8884d8" />
					<YAxis stroke="#8884d8" />
					<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
					{/* <CartesianGrid strokeDasharray="3 3" /> */}
					<Tooltip />
					<Line type="monotone" dataKey="clicks" stroke="#8884d8" strokeWidth={2} dot={{ stroke: '#8884d8', strokeWidth: 2 }} />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};




export const Overview: React.FC<CardProps<overviewData>> = ({ data, ...props }) => {
	return (
		<Card {...props}>
			<CardHeader>
				<CardTitle className="text-gray-900 text-2xl font-bold">
					Overview
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-row justfiy-between">
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

const LocationMap: React.FC<CardProps<locationData>> = ({ data, ...props }) => {
	return (
		<Card {...props} className="col-span-2">
			<CardHeader>
				<CardTitle className="text-gray-900 text-2xl font-bold">
					Activities by Location
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-row justfiy-between">
				<WMap data={data.country_codes} className="bg-slate-100 rounded-3xl" />
			</CardContent>
			<CardFooter>
				<CardDescription>Jan 10 - Feb 22</CardDescription>
			</CardFooter>
		</Card>
	);
};

const LocationTable: React.FC<CardProps<locationData>> = ({
	data,
	...props
}) => {
	return (
		<Tabs defaultValue="countries" className="w-[400px]">
			<TabsList className="grid w-full grid-cols-2">
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
	);
};

const CountriesTable: React.FC<{ data: dict }> = ({
	data,
}) => {
	return (
		<Table>
			<TableCaption>Countries by Visit</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Country</TableHead>
					<TableHead>clicks & scans</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Object.entries(data).map(([key, value]) => (
					<TableRow key={key}>
						{/* <TableCell className="font-medium">{invoice.invoice}</TableCell> */}
						<TableCell>{key}</TableCell>
						<TableCell>{value}</TableCell>
						{/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
					</TableRow>
				))}
			</TableBody>

		</Table>
	);
};
const CitiesTable: React.FC<{ data: dict }> = ({
	data,
}) => {
	return (
		<Table>
			<TableCaption>Cities by Visit</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Country</TableHead>
					<TableHead>clicks & scans</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Object.entries(data).map(([key, value]) => (
					<TableRow key={key}>
						{/* <TableCell className="font-medium">{invoice.invoice}</TableCell> */}
						<TableCell>{key}</TableCell>
						<TableCell>{value}</TableCell>
						{/* <TableCell className="text-right">{invoice.totalAmount}</TableCell> */}
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
	{ name: 'LinkedIn', value: 40 },
	{ name: 'Facebook', value: 22 },
	{ name: 'Google', value: 18 },
	{ name: 'Twitter', value: 12 },
	{ name: 'Bing', value: 8 },
	{ name: 'Direct', value: 6 },
	{ name: 'Other', value: 2 },
];

const Referrer: React.FC = () => {
	return (
		<div className="bg-white rounded-lg shadow-md p-4">
			<h2 className="text-xl font-bold mb-4">Clicks + scans by referrer</h2>
			<ResponsiveContainer width="100%" height={400}>
				{/* <BarChart data={data} layout="horizontal" margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
			<XAxis type="value" />
			<YAxis type="category" dataKey="name" />
			<CartesianGrid strokeDasharray="3 3" />
			<Tooltip />
			<Legend />
			<Bar dataKey="value" fill="#2F80ED" barSize={20} />
		  </BarChart> */}
				<BarChart
					data={data}
					index="name"
					categories={['value']}
					colors={['blue']}
					yAxisWidth={48}
					onValueChange={(v) => console.log(v)}
				/>

			</ResponsiveContainer>
		</div>
	);
};

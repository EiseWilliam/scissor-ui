// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/ocln7GZEYYH
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import Link from "next/link"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
// import { CardDescription, CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
// import { ResponsiveBar } from "@nivo/bar"
// import { ResponsiveScatterPlot } from "@nivo/scatterplot"
// import { ResponsiveLine } from "@nivo/line"
// import { ResponsivePie } from "@nivo/pie"

// export default function Component() {
//   return (
//     <div className="flex flex-col h-screen w-full">
//       <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
//         <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
//           <Link className="flex items-center gap-2 text-lg font-semibold md:text-base" href="#">
//             <Package2Icon className="w-6 h-6" />
//             <span className="sr-only">Acme Inc</span>
//           </Link>
//           <Link
//             className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//             href="#"
//           >
//             <HomeIcon className="h-4 w-4" />
//             Home
//           </Link>
//           <Link
//             className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
//             href="#"
//           >
//             <LineChartIcon className="h-4 w-4" />
//             Analytics
//           </Link>
//         </nav>
//         <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
//           <form className="flex-1 ml-auto sm:flex-initial">
//             <div className="relative">
//               <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
//               <Input className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" placeholder="Search..." type="search" />
//             </div>
//           </form>
//           <Button className="rounded-full" size="icon" variant="ghost">
//             <img
//               alt="Avatar"
//               className="rounded-full"
//               height="32"
//               src="/placeholder.svg"
//               style={{
//                 aspectRatio: "32/32",
//                 objectFit: "cover",
//               }}
//               width="32"
//             />
//             <span className="sr-only">Toggle user menu</span>
//           </Button>
//         </div>
//       </header>
//       <main className="grid min-h-[calc(100vh_-_theme(spacing.16))] gap-4 p-4 md:gap-8 md:p-6">
//         <div className="flex items-center gap-4">
//           <Button size="icon" variant="outline">
//             <ArrowLeftIcon className="h-4 w-4" />
//             <span className="sr-only">Back</span>
//           </Button>
//           <h1 className="font-semibold text-lg md:text-xl">Analytics</h1>
//           <div className="ml-auto flex items-center gap-2">
//             <Button className="hidden sm:flex" variant="outline">
//               Today
//             </Button>
//             <Button className="hidden md:flex" variant="outline">
//               This Month
//             </Button>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button className="w-[280px] justify-start text-left font-normal" id="date" variant="outline">
//                   <CalendarClockIcon className="mr-2 h-4 w-4" />
//                   June 01, 2023 - June 30, 2023
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent align="end" className="w-auto p-0">
//                 <Calendar initialFocus mode="range" numberOfMonths={2} />
//               </PopoverContent>
//             </Popover>
//           </div>
//         </div>
//         <div className="grid gap-6">
//           <div className="grid md:grid-cols-3 gap-6">
//             <Card className="flex flex-col">
//               <CardHeader>
//                 <CardDescription>Total Sales</CardDescription>
//                 <CardTitle>$2389.00</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <StackedbarChart className="aspect-[4/3]" />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardDescription>Sessions</CardDescription>
//                 <CardTitle>345</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <DotChart className="aspect-[4/3]" />
//               </CardContent>
//             </Card>
//             <Card className="flex flex-col">
//               <CardHeader>
//                 <CardDescription>Returning Customers</CardDescription>
//                 <CardTitle>33.5%</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <GroupedbarChart className="aspect-[4/3]" />
//               </CardContent>
//             </Card>
//           </div>
//           <div className="grid md:grid-cols-3 gap-6">
//             <Card className="flex flex-col">
//               <CardHeader>
//                 <CardDescription>Visitors</CardDescription>
//                 <CardTitle>3,456</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <LineChart className="aspect-[4/3]" />
//               </CardContent>
//             </Card>
//             <Card className="flex flex-col">
//               <CardHeader>
//                 <CardDescription>Page Views</CardDescription>
//                 <CardTitle>12,345</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <LabelledpieChart className="aspect-[4/3]" />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardDescription>Visitors</CardDescription>
//                 <CardTitle>Top Referrers</CardTitle>
//               </CardHeader>
//               <CardContent className="grid gap-4">
//                 <div className="flex items-center">
//                   <div>google.com</div>
//                   <div className="font-semibold ml-auto">3K</div>
//                 </div>
//                 <div className="flex items-center">
//                   <div>twitter.com</div>
//                   <div className="font-semibold ml-auto">1.2K</div>
//                 </div>
//                 <div className="flex items-center">
//                   <div>youtube.com</div>
//                   <div className="font-semibold ml-auto">1.1K</div>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }

// function ArrowLeftIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m12 19-7-7 7-7" />
//       <path d="M19 12H5" />
//     </svg>
//   )
// }


// function CalendarClockIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" />
//       <path d="M16 2v4" />
//       <path d="M8 2v4" />
//       <path d="M3 10h5" />
//       <path d="M17.5 17.5 16 16.25V14" />
//       <path d="M22 16a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />
//     </svg>
//   )
// }


// function DotChart(props) {
//   return (
//     <div {...props}>
//       <ResponsiveScatterPlot
//         data={[
//           {
//             id: "Desktop",
//             data: [
//               { x: "Jan", y: 43 },
//               { x: "Feb", y: 137 },
//               { x: "Mar", y: 61 },
//               { x: "Apr", y: 145 },
//               { x: "May", y: 26 },
//               { x: "Jun", y: 154 },
//             ],
//           },
//           {
//             id: "Mobile",
//             data: [
//               { x: "Jan", y: 60 },
//               { x: "Feb", y: 48 },
//               { x: "Mar", y: 177 },
//               { x: "Apr", y: 78 },
//               { x: "May", y: 96 },
//               { x: "Jun", y: 204 },
//             ],
//           },
//         ]}
//         margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
//         xScale={{ type: "point" }}
//         yScale={{ type: "linear" }}
//         blendMode="multiply"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 0,
//           tickPadding: 16,
//         }}
//         axisLeft={{
//           tickSize: 0,
//           tickValues: 5,
//           tickPadding: 16,
//         }}
//         colors={["#2563eb", "#e11d48"]}
//         useMesh={true}
//         gridYValues={6}
//         theme={{
//           tooltip: {
//             chip: {
//               borderRadius: "9999px",
//             },
//             container: {
//               fontSize: "12px",
//               textTransform: "capitalize",
//               borderRadius: "6px",
//             },
//           },
//           grid: {
//             line: {
//               stroke: "#f3f4f6",
//             },
//           },
//         }}
//         role="application"
//       />
//     </div>
//   )
// }


// function GroupedbarChart(props) {
//   return (
//     <div {...props}>
//       <ResponsiveBar
//         data={[
//           { name: "Jan", desktop: 111, mobile: 99 },
//           { name: "Feb", desktop: 157, mobile: 87 },
//           { name: "Mar", desktop: 129, mobile: 89 },
//           { name: "Apr", desktop: 187, mobile: 151 },
//           { name: "May", desktop: 119, mobile: 127 },
//           { name: "Jun", desktop: 20, mobile: 121 },
//         ]}
//         keys={["desktop", "mobile"]}
//         indexBy="name"
//         groupMode="grouped"
//         margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
//         padding={0.3}
//         colors={["#2563eb", "#e11d48"]}
//         axisBottom={{
//           tickSize: 0,
//           tickPadding: 16,
//         }}
//         axisLeft={{
//           tickSize: 0,
//           tickValues: 4,
//           tickPadding: 16,
//         }}
//         gridYValues={4}
//         theme={{
//           tooltip: {
//             chip: {
//               borderRadius: "9999px",
//             },
//             container: {
//               fontSize: "12px",
//               textTransform: "capitalize",
//               borderRadius: "6px",
//             },
//           },
//           grid: {
//             line: {
//               stroke: "#f3f4f6",
//             },
//           },
//         }}
//         tooltipLabel={({ id }) => `${id}`}
//         enableLabel={false}
//         role="application"
//         ariaLabel="A grouped bar chart"
//       />
//     </div>
//   )
// }


// function HomeIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
//       <polyline points="9 22 9 12 15 12 15 22" />
//     </svg>
//   )
// }


// function LabelledpieChart(props) {
//   return (
//     <div {...props}>
//       <ResponsivePie
//         data={[
//           { id: "Jan", value: 111 },
//           { id: "Feb", value: 157 },
//           { id: "Mar", value: 129 },
//           { id: "Apr", value: 150 },
//           { id: "May", value: 119 },
//           { id: "Jun", value: 72 },
//         ]}
//         sortByValue
//         margin={{ top: 30, right: 50, bottom: 30, left: 50 }}
//         innerRadius={0.5}
//         padAngle={1}
//         cornerRadius={3}
//         activeOuterRadiusOffset={2}
//         borderWidth={1}
//         arcLinkLabelsThickness={1}
//         enableArcLabels={false}
//         colors={["#2563eb"]}
//         theme={{
//           tooltip: {
//             chip: {
//               borderRadius: "9999px",
//             },
//             container: {
//               fontSize: "12px",
//               textTransform: "capitalize",
//               borderRadius: "6px",
//             },
//           },
//         }}
//         role="application"
//       />
//     </div>
//   )
// }


// function LineChart(props) {
//   return (
//     <div {...props}>
//       <ResponsiveLine
//         data={[
//           {
//             id: "Desktop",
//             data: [
//               { x: "Jan", y: 43 },
//               { x: "Feb", y: 137 },
//               { x: "Mar", y: 61 },
//               { x: "Apr", y: 145 },
//               { x: "May", y: 26 },
//               { x: "Jun", y: 154 },
//             ],
//           },
//           {
//             id: "Mobile",
//             data: [
//               { x: "Jan", y: 60 },
//               { x: "Feb", y: 48 },
//               { x: "Mar", y: 177 },
//               { x: "Apr", y: 78 },
//               { x: "May", y: 96 },
//               { x: "Jun", y: 204 },
//             ],
//           },
//         ]}
//         margin={{ top: 10, right: 10, bottom: 40, left: 40 }}
//         xScale={{
//           type: "point",
//         }}
//         yScale={{
//           type: "linear",
//         }}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 0,
//           tickPadding: 16,
//         }}
//         axisLeft={{
//           tickSize: 0,
//           tickValues: 5,
//           tickPadding: 16,
//         }}
//         colors={["#2563eb", "#e11d48"]}
//         pointSize={6}
//         useMesh={true}
//         gridYValues={6}
//         theme={{
//           tooltip: {
//             chip: {
//               borderRadius: "9999px",
//             },
//             container: {
//               fontSize: "12px",
//               textTransform: "capitalize",
//               borderRadius: "6px",
//             },
//           },
//           grid: {
//             line: {
//               stroke: "#f3f4f6",
//             },
//           },
//         }}
//         role="application"
//       />
//     </div>
//   )
// }


// function LineChartIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//     <title>Analytics</title>
//       <path d="M3 3v18h18" />
//       <path d="m19 9-5 5-4-4-3 3" />
//     </svg>
//   )
// }


// function Package2Icon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
//       <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
//       <path d="M12 3v6" />
//     </svg>
//   )
// }


// function SearchIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <circle cx="11" cy="11" r="8" />
//       <path d="m21 21-4.3-4.3" />
//     </svg>
//   )
// }


// function StackedbarChart(props) {
//   return (
//     <div {...props}>
//       <ResponsiveBar
//         data={[
//           { name: "Jan", desktop: 111, mobile: 99 },
//           { name: "Feb", desktop: 157, mobile: 87 },
//           { name: "Mar", desktop: 129, mobile: 89 },
//           { name: "Apr", desktop: 187, mobile: 151 },
//           { name: "May", desktop: 119, mobile: 127 },
//           { name: "Jun", desktop: 20, mobile: 121 },
//         ]}
//         keys={["desktop", "mobile"]}
//         indexBy="name"
//         margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
//         padding={0.3}
//         colors={["#2563eb", "#e11d48"]}
//         axisBottom={{
//           tickSize: 0,
//           tickPadding: 16,
//         }}
//         axisLeft={{
//           tickSize: 0,
//           tickValues: 4,
//           tickPadding: 16,
//         }}
//         gridYValues={4}
//         theme={{
//           tooltip: {
//             chip: {
//               borderRadius: "9999px",
//             },
//             container: {
//               fontSize: "12px",
//               textTransform: "capitalize",
//               borderRadius: "6px",
//             },
//           },
//           grid: {
//             line: {
//               stroke: "#f3f4f6",
//             },
//           },
//         }}
//         tooltipLabel={({ id }) => `${id}`}
//         enableLabel={false}
//         role="application"
//         ariaLabel="A stacked bar chart"
//       />
//     </div>
//   )
// }
// /**
//  * This code was generated by v0 by Vercel.
//  * @see https://v0.dev/t/sj438FEnkP5
//  */
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
// import { CardDescription, CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
// import { ResponsiveLine } from "@nivo/line"

// export function Dashboard() {
//   return (
//     <div className="grid h-screen w-full min-h-screen/1">
//       <div className="flex flex-col w-full">
//         <nav className="flex flex-col h-full gap-0.5 bg-gray-100 border-r shrink-0 dark:bg-gray-800 dark:border-gray-800/40">
//           <Link className="flex h-[60px] items-center px-6" href="#">
//             <Package2Icon className="h-6 w-6" />
//             <span className="sr-only">Home</span>
//           </Link>
//           <Link
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//             href="#"
//           >
//             <HomeIcon className="h-4 w-4" />
//             Home
//           </Link>
//           <Link
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//             href="#"
//           >
//             <LineChartIcon className="h-4 w-4" />
//             Analytics
//           </Link>
//           <Link
//             className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900  transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
//             href="#"
//           >
//             <FileIcon className="h-4 w-4" />
//             Reports
//           </Link>
//           <Link
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//             href="#"
//           >
//             <UsersIcon className="h-4 w-4" />
//             Customers
//           </Link>
//           <Link
//             className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
//             href="#"
//           >
//             <LandmarkIcon className="h-4 w-4" />
//             Finances
//           </Link>
//         </nav>
//         <main className="flex flex-col min-h-screen">
//           <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
//             <Button className="rounded-lg md:hidden" variant="outline">
//               <ChevronRightIcon className="h-4 w-4" />
//               <span className="sr-only">Toggle sidebar</span>
//             </Button>
//             <h1 className="font-semibold text-lg md:text-xl lg:text-2xl">Sales Report</h1>
//             <form className="flex-1">
//               <div className="relative">
//                 <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
//                 <Input
//                   className="w-full bg-gray-100/50 appearance-none pl-8 md:w-[300px] lg:w-[400px] dark:placeholder-gray-300/50"
//                   placeholder="Search"
//                   type="search"
//                 />
//               </div>
//             </form>
//             <Button className="rounded-full" size="icon" variant="outline">
//               <BellIcon className="h-4 w-4" />
//               <span className="sr-only">Toggle notifications</span>
//             </Button>
//             <Popover>
//               <PopoverTrigger asChild>
//                 <Button className="rounded-full" size="icon" variant="ghost">
//                   <img
//                     alt="Avatar"
//                     className="rounded-full"
//                     height="32"
//                     src="/placeholder.svg"
//                     style={{
//                       aspectRatio: "32/32",
//                       objectFit: "cover",
//                     }}
//                     width="32"
//                   />
//                   <span className="sr-only">Toggle user menu</span>
//                 </Button>
//               </PopoverTrigger>
//               <PopoverContent align="end">
//                 <div>
//                   <div>
//                     <UserIcon className="mr-2 h-4 w-4" />
//                     Profile
//                   </div>
//                   <div>
//                     <SettingsIcon className="mr-2 h-4 w-4" />
//                     Settings
//                   </div>
//                   <div />
//                   <div>
//                     <LogOutIcon className="mr-2 h-4 w-4" />
//                     Logout
//                   </div>
//                 </div>
//               </PopoverContent>
//             </Popover>
//           </header>
//           <div className="flex-1 p-4 md:p-6">
//             <div className="grid gap-6">
//               <Card>
//                 <CardHeader>
//                   <CardDescription>Net Sales</CardDescription>
//                   <CardTitle>$12,345.67</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <CurvedlineChart className="aspect-[2/1]" />
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardDescription>Gross Profit</CardDescription>
//                   <CardTitle>$5,432.10</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <FilledtimeseriesChart className="aspect-[2/1]" />
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader>
//                   <CardDescription>Gross Margin</CardDescription>
//                   <CardTitle>35%</CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <CurvedlineChart className="aspect-[2/1]" />
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }


// function CurvedlineChart(props: any) {
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
//           min: 0,
//           max: "auto",
//         }}
//         curve="monotoneX"
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


// function FilledtimeseriesChart(props: any) {
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
//           min: 0,
//           max: "auto",
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
//         curve="monotoneX"
//         enableArea={true}
//         gridYValues={6}
//         defs={[
//           {
//             id: "line-chart-gradient",
//             type: "linearGradient",
//             colors: [
//               { offset: 0, color: "inherit" },
//               { offset: 200, color: "inherit", opacity: 0 },
//             ],
//           },
//         ]}
//         fill={[{ match: "*", id: "line-chart-gradient" }]}
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

// import { DashNavMenu } from "@/components/dashboard";
// import { Outlet, createRootRoute } from "@tanstack/react-router";

// export const Route = createRootRoute({
// 	component: () => {
// 		return(	<main className="flex flex-row">
// 		<DashNavMenu />
// 		{/* <Outlet /> */}
// 	</main>)
	
// 	},
// });
// import Navbar from "@/components/navbar";
import { Outlet, createRootRoute } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
// export const Route = createRootRoute({
// 	component: () => {
// 		return (
// 			<>
// 				<Navbar />
// 				<Outlet />
// 				<TanStackRouterDevtools />
// 			</>
// 		);
// 	},
// });


import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout')({
  component: LayoutComponent,
})

function LayoutComponent() {
  return (
    <div>
      <h1>Layout</h1>
      <Outlet />
    </div>
  )
}
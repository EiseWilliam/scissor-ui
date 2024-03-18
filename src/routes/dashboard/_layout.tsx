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
import { DashNavMenu } from "@/components/dashboard";
import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";
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

import { createFileRoute } from "@tanstack/react-router";
import { UseAuthContext } from "@/context/auth-context";
export const Route = createFileRoute("/dashboard/_layout")({
	beforeLoad: ({ context, location }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/login",
				search: {
					redirect: location.href,
				},
			});
		}
	},
	component: DashboardLayout,
});

function DashboardLayout() {
	return (
		<main className="flex flex-row">
			<DashNavMenu />
			<Outlet />
		</main>
	);
}

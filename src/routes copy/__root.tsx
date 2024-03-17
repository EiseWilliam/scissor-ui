import Navbar from "@/components/navbar";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
export const Route = createRootRoute({
	component: () => {
		return (
			<>
				<Navbar />
				<Outlet />
				<TanStackRouterDevtools />
			</>
		);
	},
});

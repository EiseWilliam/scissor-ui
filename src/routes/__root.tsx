import Navbar from "@/components/navbar";
import { Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { UseAuthContext, type AuthContextType } from "@/context/auth-context";
import { createRootRouteWithContext } from "@tanstack/react-router";

interface MyRouterContext {
  auth: AuthContextType
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => {
		const auth = UseAuthContext();
		return (
			<>
				<Navbar />
				<Outlet />
				{/* <TanStackRouterDevtools /> */}
			</>
		);
	},
});

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, type createRouter } from "@tanstack/react-router";
import type { FunctionComponent } from "./lib/types";
import AuthProvider from "@/context/auth-context";
import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";

const queryClient = new QueryClient();

type AppProps = { router: ReturnType<typeof createRouter> };

const App = ({ router }: AppProps): FunctionComponent => {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<TanStackRouterDevelopmentTools
				router={router}
				initialIsOpen={false}
				position="bottom-right"
			/>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
			</QueryClientProvider>
		</AuthProvider>
	);
};

export default App;

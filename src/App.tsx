import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { FunctionComponent } from "./lib/types";
import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";
import { router } from "./main";



const queryClient = new QueryClient();


const App = (): FunctionComponent => {
	return (
		<main className="bg-gradient-to-b from-white to-[#f9efff] min-h-screen min-w-screen">
			<QueryClientProvider client={queryClient}>
				<TanStackRouterDevelopmentTools
					router={router}
					initialIsOpen={false}
					position="bottom-right"
				/>
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</main>
	);
};

export default App;

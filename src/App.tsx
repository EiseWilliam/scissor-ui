
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { FunctionComponent } from "./lib/types";
import { TanStackRouterDevelopmentTools } from "./components/utils/development-tools/TanStackRouterDevelopmentTools";
import { router } from "./main";



const App = (): FunctionComponent => {
	return (

			<main className="bg-gradient-to-b from-white to-[#f9efff] min-h-screen min-w-screen">
				<TanStackRouterDevelopmentTools
					router={router}
					initialIsOpen={false}
					position="bottom-right"
				/>
				<ReactQueryDevtools initialIsOpen={false} />
			</main>

	);
};

export default App;

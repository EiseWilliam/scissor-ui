import { createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "@/styles/tailwind.css";
import AuthProvider, { UseAuthContext } from "@/context/auth-context";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const router = createRouter({ routeTree,  defaultPreload: 'intent',
  context: {
    auth: undefined!, // This will be set after we wrap the app in an AuthProvider
  }, });

declare module "@tanstack/react-router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}
type AppProps = { router: ReturnType<typeof createRouter> };
const queryClient = new QueryClient();

function InnerApp() {
  const auth = UseAuthContext()
  return <RouterProvider router={router} context={{ auth }} />
}

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<InnerApp />
				</AuthProvider>
			</QueryClientProvider>
		</React.StrictMode>,
	);
}

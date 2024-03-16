import { createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import "@/styles/global.css";
import AuthProvider from "@/context/auth-context";
import { RouterProvider } from "@tanstack/react-router";

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: typeof router;
	}
}
type AppProps = { router: ReturnType<typeof createRouter> };

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</React.StrictMode>,
	);
}

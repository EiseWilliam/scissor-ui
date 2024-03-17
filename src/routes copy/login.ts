import { createFileRoute } from "@tanstack/react-router";

import AuthPage from "@/pages/Auth";

export const Route = createFileRoute("/login")({
	component: () => AuthPage(false),
});

import { createFileRoute } from "@tanstack/react-router";
import { UrlsListPage } from "@/pages/UrlList";

export const Route = createFileRoute("/dashboard/_layout/urls")({
	component: UrlsListPage,
});

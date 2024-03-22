import { createFileRoute } from "@tanstack/react-router";
import { QRsListPage } from "@/pages/QRList";

export const Route = createFileRoute("/dashboard/_layout/qrs")({
	component: QRsListPage,
});

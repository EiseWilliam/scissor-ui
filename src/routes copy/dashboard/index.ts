import { createFileRoute } from "@tanstack/react-router";
import { MyUrls } from '@/components/myurls';

export const Route = createFileRoute("/dashboard/")({
	component: MyUrls
});

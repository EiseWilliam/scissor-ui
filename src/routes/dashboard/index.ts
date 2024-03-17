import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/pages/Home";
import { MyUrls } from '@/components/myurls';

export const Route = createFileRoute("/dashboard/")({
	component: MyUrls
});

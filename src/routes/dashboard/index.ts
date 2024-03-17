import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/pages/Home";
import { MyUrls } from '@/components/myUrls';

export const Route = createFileRoute("/dashboard/")({
	component: MyUrls,
});

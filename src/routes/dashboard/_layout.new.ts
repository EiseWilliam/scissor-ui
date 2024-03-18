import { AShortenerPanel } from '@/components/home-panels';
import { createFileRoute } from '@tanstack/react-router';



export const Route = createFileRoute('/dashboard/_layout/new')({
  component: AShortenerPanel
})
import { AShortenerPanel } from '@/components/home-panels';
import NewLinkForm from '@/pages/New';
import { createFileRoute } from '@tanstack/react-router';



export const Route = createFileRoute('/dashboard/_layout/new')({
  component: NewLinkForm
})
import { createFileRoute } from '@tanstack/react-router';
import { UrlsListPage } from '@/pages/UserList';

export const Route = createFileRoute('/dashboard/_layout/urls/$shortUrl')({
  component: UrlsListPage
})

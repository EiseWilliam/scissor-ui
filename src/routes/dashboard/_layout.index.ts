
import { UrlsListPage } from '@/pages/UserList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/')({
  component: UrlsListPage
})
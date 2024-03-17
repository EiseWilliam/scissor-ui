import { MyUrls } from '@/components/myurls'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/urls')({
  component: MyUrls
})
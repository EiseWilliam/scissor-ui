
import ProfilePage from '@/pages/Profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/profile')({
  component: ProfilePage
})
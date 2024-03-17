
import ProfilePage from '@/pages/Profile'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/profile')({
  component: ProfilePage
})
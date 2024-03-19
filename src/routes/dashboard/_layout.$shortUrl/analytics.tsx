import AnalyticsPage from '@/pages/Analytics';
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/dashboard/_layout/$shortUrl/analytics') ({
  component: () => {
    const { shortUrl } = Route.useParams();
    return <AnalyticsPage shortUrl={shortUrl} />;
  }
})

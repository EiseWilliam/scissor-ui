import AnalyticsPage from '@/pages/Analytics';
import { createFileRoute } from '@tanstack/react-router'


export const Route = createFileRoute('/dashboard/_layout/analytics/$shortUrl') ({
  component: () => {
    const { shortUrl } = Route.useParams();
    return <AnalyticsPage shortUrl={shortUrl} />;
  }
})

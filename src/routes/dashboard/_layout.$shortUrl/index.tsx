import { createFileRoute } from '@tanstack/react-router';
import { UrlsDetailsPage } from '@/pages/UrlDetails';

export const Route = createFileRoute('/dashboard/_layout/$shortUrl/') ({
  component: () => {
    const { shortUrl } = Route.useParams();
    return <UrlsDetailsPage shortUrl={shortUrl} />
  }
})

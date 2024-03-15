"use client"


import { ShortenedUrlCard } from '@/components/MyUrls';
import { Overview, type overviewData } from '@/components/analytics';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRequest } from '@/lib/hooks';
import { type urlDetails } from '@/lib/types';


function Page({ params }: { params: { shortUrl: string } }) {
  const { data, error, isLoading } = useRequest<urlDetails>(`http://localhost:8000/+${params.shortUrl}`)
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return <div>No data</div>
  return (

    <div className="w-full max-h-fit bg-white rounded-lg shadow-lg p-6">
      <ShortenedUrlCard data={data} />
      <div className="flex fex-row gap-2">
        <QRCode />
        <QuickStats />
      </div>
      <button type="button" className="bg-white text-blue-600 font-sans font-medium py-2 px-4 rounded">View full analytics &gt; &gt;</button>

    </div>
  )
}

export default Page




const QRCode = () => {
  return (
    <div className="bg-white w-1/2">
      <div className="text-slate-800 font-bold">QR Code</div>
      <Card >
        <CardHeader>
          <CardTitle className="text-gray-900 text-2xl font-bold">
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row justfiy-between">
          <p>Scans</p>
          <span className="flex-grow">312</span>
        </CardContent>
        <CardContent>
          <p>Clicks</p>
        </CardContent>
        <CardContent>
          <p>Total Engagement</p>
        </CardContent>
        <CardFooter>
          <CardDescription>Jan 10 - Feb 22</CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

const QuickStats = (data: overviewData) => {
  return (
    <div className="bg-white w-1/2">
      <div className="text-slate-800 font-bold">Quick Stats</div>
      <Overview data={data} className="w-full h-fit tesxt-red-600" />
    </div>
  );
};


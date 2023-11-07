import { Card, CardContent, CardHeader } from './ui/card';
import { CalendarDays } from 'lucide-react';
import { DateString } from './ui/date';
import Gallery from './ui/gallery';
import OrganizationAvatar from './OrganizationAvatar';

const dummyInitiative = {
  name: "Food for Pakistan",
  description: "These siblings have been displaced, oh no! One is in the pacific, and the other in the atlantic. Alas! How can we rectify this? Leave it to us! Your donations go towards this heart-warming reunion.",
  images: [
    "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  ],
  timestamp: Date.now(),
  address: "www.google.com",
}

export default function StoryCard() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader>
        <OrganizationAvatar />
        <p className="text-sm font-semibold">
          in <span className="underline"><a href={dummyInitiative.address}>{dummyInitiative.name}</a></span>
        </p>
        <div className="pt-2 inline-flex gap-2 items-center text-slate-500">
          <CalendarDays size={17} /> <DateString timestamp={dummyInitiative.timestamp} />
        </div>
      </CardHeader>
      <div className="px-2 -mt-2">
        <Gallery images={dummyInitiative.images} />
      </div>
      <CardContent className="flex flex-col pb-8 pt-3 gap-3 px-0">
        <p className="px-6">
          {dummyInitiative.description}
        </p>
      </CardContent>
    </Card>
  );
}
import OrganizationAvatar from './OrganizationAvatar';
import { Card, CardContent, CardHeader } from './ui/card';
import { DateDisplay } from './ui/date-posted';
import Gallery from './ui/gallery';

const dummyStory = {
  name: "Food for Pakistan",
  orgName: "Food not bombs",
  description: "These siblings have been displaced, oh no! One is in the pacific, and the other in the atlantic. Alas! How can we rectify this? Leave it to us! Your donations go towards this heart-warming reunion.",
  images: [
    "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    // "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  ],
  timestamp: Date.now(),
  address: "www.google.com",
}

export default function StoryCard() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader>
        <OrganizationAvatar avatarProps={{ title: dummyStory.orgName }} />
        <p className="text-sm font-semibold">
          in <span className="underline"><a href={dummyStory.address}>{dummyStory.name}</a></span>
        </p>
        <DateDisplay timestamp={dummyStory.timestamp} className="py-4" />
      </CardHeader>
      <div className="px-2 -mt-2">
        <Gallery images={dummyStory.images} />
      </div>
      <CardContent className="flex flex-col pb-8 pt-3 gap-3 px-0">
        <p className="px-6">
          {dummyStory.description}
        </p>
      </CardContent>
    </Card>
  );
}
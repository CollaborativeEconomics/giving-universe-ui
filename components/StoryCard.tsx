import {OrganizationAvatar} from './OrganizationAvatar';
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
  imgSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.IOGGKcmJMYKPkMuimQDLnwHaHv%26pid%3DApi%26h%3D160&f=1&ipt=944cafc6104e904b7776f748ee311ce1318b52ab6ec349dddbdc9f85850f4890&ipo=images",
}

export default function StoryCard({ ...props }) {
  const item = props?.data || {}
  const organization = props?.organization || {}
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader>
        <OrganizationAvatar name={organization.name} image={organization.image} avatarProps={{ title: organization.name }} />
        <p className="text-sm font-semibold">
          in <span className="underline"><a href={item.address}>{item.name}</a></span>
        </p>
        <DateDisplay timestamp={item.created} className="py-4" />
      </CardHeader>
      <div className="px-2 -mt-2">
        <Gallery images={[item.image]} />
      </div>
      <CardContent className="flex flex-col pb-8 pt-3 gap-3 px-0">
        <p className="px-6">
          {item.description}
        </p>
      </CardContent>
    </Card>
  );
}
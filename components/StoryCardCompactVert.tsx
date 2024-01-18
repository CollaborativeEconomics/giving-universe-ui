import Image from 'next/image';
import { Card, CardContent, CardHeader } from './ui/card';
import { DateDisplay } from './ui/date-posted';
import { OrganizationAvatar } from './OrganizationAvatar';

const dummyStory = {
  name: "Food for Pakistan",
  description: "These siblings have been displaced, oh no! One is in the pacific, and the other in the atlantic. Alas! How can we rectify this? Leave it to us! Your donations go towards this heart-warming reunion.",
  images: [
    "https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
  ],
  timestamp: Date.now(),
  address: "www.google.com",
  imgSrc: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.IOGGKcmJMYKPkMuimQDLnwHaHv%26pid%3DApi%26h%3D160&f=1&ipt=944cafc6104e904b7776f748ee311ce1318b52ab6ec349dddbdc9f85850f4890&ipo=images",
};

export default function StoryCardCompactVert() {
  return (
    <Card className="flex flex-col overflow-hidden h-auto">
      <div className="relative min-w-[150px] w-full h-auto aspect-[8/5]">
        <Image
          className=""
          src={dummyStory.images[0]}
          alt="IMG BG"
          fill style={{
            objectFit: 'cover',
          }}
        />
      </div>

      <CardContent className="flex flex-col overflow-hidden gap-3">

        <div className="inline-flex flex-wrap items-top pl-6 gap-x-4 pt-4">
          <OrganizationAvatar className="flex-wrap" name={dummyStory.name} image={dummyStory.imgSrc}/>
          <p className="text-sm font-semibold truncate">
            in <span className="underline"><a href={dummyStory.address}>{dummyStory.name}</a></span>
          </p>
        </div>

        <DateDisplay timestamp={dummyStory.timestamp} className="pl-6" />
        <div className="pl-6 line-clamp-2">
          {dummyStory.description}
          {dummyStory.description}
        </div>

      </CardContent>
    </Card>
  )
}
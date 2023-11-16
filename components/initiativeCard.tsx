"use client"
import Image from 'next/image';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { DateDisplay } from './ui/date-posted';
import { Button } from './ui/button';
import OrganizationAvatar from './OrganizationAvatar';
import { OrgStats } from './ui/org-stats';

const dummyName: string = "Food not bombs";
const dummyImgSrc: string = "https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75";
const dummyStats = {
  amountTarget: 5000,
  amountRaised: 1000,
  donorCount: 35,
  institutionalDonorCount: 3,
}

export default function InitiativeCard({ ...props }) {
  const item = props?.data || {}
  let image = dummyImgSrc
  if (item?.imageUri) {
    image = item?.imageUri.startsWith('ipfs') ? 'https://ipfs.filebase.io/ipfs/' + item.imageUri.substr(5) : item.imageUri
  }
  const startDate = new Date(item?.start).getTime()

  return (
    <Card className="flex flex-col overflow-hidden h-auto">
      <CardHeader className="relative h-72">
        <Image
          src={image}
          alt="IMG BG"
          fill style={{
            objectFit: 'cover',
          }}
        />
      </CardHeader>

      <CardContent className="flex flex-col pb-8 pt-3 gap-3 px-0">
        <h3 className="px-6 pt-2 text-xl font-semibold uppercase">
          {item.title}
        </h3>
        <DateDisplay timestamp={startDate} className="px-6" />
        <p className="px-6">
          {item.description}
        </p>
        <Separator />
        <div className="px-6 pt-3">
          <Progress value={dummyStats.amountRaised / dummyStats.amountTarget * 100} />
        </div>
        <OrgStats orgStatProps={{
          amountRaised: dummyStats.amountRaised,
          amountTarget: dummyStats.amountTarget,
          donorCount: dummyStats.donorCount,
          institutionalDonorCount: dummyStats.institutionalDonorCount,
        }} />
        <Separator />
        <div className="px-6 pt-6 inline-flex justify-between">
          <OrganizationAvatar avatarProps={{ title: dummyName }} />
          <Button className="mx-6 bg-transparent text-black dark:text-white outline outline-slate-300 outline-1">Donate</Button>
        </div>
      </CardContent>
    </Card>
  );
}
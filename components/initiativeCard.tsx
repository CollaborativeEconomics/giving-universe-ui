import Image from 'next/image';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { DateDisplay } from './ui/date-posted';
import { Button } from './ui/button';
import { Building2, UserIcon, DollarSign } from 'lucide-react';
import OrganizationAvatar from './OrganizationAvatar';

const dummyImgSrc: string = "https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75";
const dummyTitle: string = "Petting a dog";
const dummyCreatedTimestamp: number = Date.now();
const dummyDescription = "These siblings have been displaced, oh no! One is in the pacific, and the other in the atlantic. Alas! How can we rectify this? Leave it to us! Your donations go towards this heart-warming reunion."
const dummyStats = {
  amountTarget: 5000,
  amountRaised: 1000,
  donorCount: 35,
  institutionalDonorCount: 3,
}

export default function InitiativeCard() {
  return (
    <Card className="flex flex-col overflow-hidden h-auto">
      <CardHeader className="relative h-72">
        <Image
          src={dummyImgSrc}
          alt="IMG BG"
          fill style={{
            objectFit: 'cover',
          }}
        />
      </CardHeader>

      <CardContent className="flex flex-col pb-8 pt-3 gap-3 px-0">
        <h3 className="px-6 pt-2 text-xl font-semibold uppercase">
          {dummyTitle}
        </h3>
        <DateDisplay timestamp={dummyCreatedTimestamp} /> 
        <p className="px-6">
          {dummyDescription}
        </p>
        <Separator />
        <div className="px-6 pt-3">
          <Progress value={dummyStats.amountRaised / dummyStats.amountTarget * 100} />
        </div>
        <div className="px-6">
          <ul className="px-3 flex flex-col gap-2">
            <li className="inline-flex gap-3 text-sm font-semibold">
              <DollarSign size={17} /> ${dummyStats.amountRaised.toLocaleString()} of ${dummyStats.amountTarget.toLocaleString()} raised this month
            </li>
            <li className="inline-flex gap-3 text-sm font-semibold">
              <UserIcon size={17} /> {dummyStats.donorCount} Donors
            </li>
            <li className="inline-flex gap-3 text-sm font-semibold">
              <Building2 size={17} /> {dummyStats.institutionalDonorCount} Institutional Donors
            </li>
          </ul>
        </div>
        <Separator />
        <div className="px-6 pt-6 inline-flex justify-between text-black">
          <OrganizationAvatar />
          <Button className="mx-6 bg-transparent text-black outline outline-slate-300 outline-1">Donate</Button>
        </div>
      </CardContent>
    </Card>
  );
}
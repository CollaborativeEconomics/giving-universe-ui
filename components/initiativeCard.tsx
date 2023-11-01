import Image from 'next/image';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Building2, UserIcon } from 'lucide-react';
import OrganizationAvatar from './organizationAvatar';

export default function InitiativeCard() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="relative h-60 p-0">
        <Image
          src="https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75"
          alt="IMG BG"
          fill
          style={{
            objectFit: 'cover',
          }}
        />
        <div className="flex h-full flex-col justify-end z-10 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent to-30% p-3">
          <h3 className="text-2xl font-semibold uppercase text-white">
            Petting a dog
          </h3>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col pb-6 pt-3 gap-3 px-0">
        <div className="px-6">
          <OrganizationAvatar />
        </div>
        <Separator />
        <p className="px-6">
          These siblings have been displaced, oh no! One is in the pacific, and
          the other in the atlantic. Alas! How can we rectify this? Leave it to
          us! Your donations go towards this heart-warming reunion.
        </p>
        <div className="px-6">
          <Progress value={50} />
        </div>
        <div className="px-6">
          <p className="text-sm font-semibold">
            $21,030 of $30,000 raised this month
          </p>
        </div>
        <div className="px-6">
          <ul className="px-3 flex flex-col gap-2">
            <li className="inline-flex gap-2 text-sm">
              <UserIcon size={17} /> 35 Donors
            </li>
            <li className="inline-flex gap-2 text-sm">
              <Building2 size={17} /> 3 Institutional Donors
            </li>
          </ul>
        </div>
        <Separator />
        <Button className="mx-6">Donate</Button>
      </CardContent>
    </Card>
  );
}

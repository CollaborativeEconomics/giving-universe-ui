import Image from 'next/image';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Building2, DollarSign, Target, UserIcon } from 'lucide-react';

export default function OrganizationCard() {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="relative h-40 p-3">
        <Image
          src="https://www.giving-universe.org/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmfUK8dZNrZUqJTLAuaSJ37bmWpMQ2NfJ8JQbvXEkSGrtN&w=384&q=75"
          alt="IMG BG"
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </CardHeader>
      <CardContent className="flex flex-col p-6 pt-3 gap-3">
        <h3 className="text-2xl font-semibold uppercase">Public Node</h3>
        <Separator />
        <p>
          These siblings have been displaced, oh no! One is in the pacific, and
          the other in the atlantic. Alas! How can we rectify this? Leave it to
          us! Your donations go towards this heart-warming reunion.
        </p>
        <ul className="px-3 flex flex-col gap-2">
          <li className="inline-flex gap-2 text-sm">
            <DollarSign size={17} /> $21,030 raised this month
          </li>
          <li className="inline-flex gap-2 text-sm">
            <Target size={17} /> 5 Initiatives
          </li>
          <li className="inline-flex gap-2 text-sm">
            <UserIcon size={17} /> 35 Donors
          </li>
          <li className="inline-flex gap-2 text-sm">
            <Building2 size={17} /> 3 Institutional Donors
          </li>
        </ul>
        <Separator />
        <Button>Donate</Button>
      </CardContent>
    </Card>
  );
}

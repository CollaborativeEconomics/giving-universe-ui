"use client"
import Image from 'next/image';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Building2, DollarSign, Target, UserIcon } from 'lucide-react';

export default function OrganizationCard({ ...props }) {
  //console.log('ITEM', props?.data)
  const item  = props?.data || {}
  const count = item?.initiative?.length || 0

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="relative h-40 p-3">
        <Image
          src={item.image}
          alt="IMG BG"
          fill
          style={{
            objectFit: 'cover',
          }}
        />
      </CardHeader>
      <CardContent className="flex flex-col p-6 pt-3 gap-3">
        <h3 className="text-2xl font-semibold uppercase">{item.name}</h3>
        <Separator />
        <p>{item.description}</p>
        <ul className="px-3 flex flex-col gap-2">
          <li className="inline-flex gap-2 text-sm">
            <DollarSign size={17} /> $21,030 raised this month
          </li>
          <li className="inline-flex gap-2 text-sm">
            <Target size={17} /> {count} Initiative{count==1?'':'s'}
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

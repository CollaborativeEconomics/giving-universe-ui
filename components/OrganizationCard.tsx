"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Building2, DollarSign, Target, UserIcon } from 'lucide-react';
import money from '@/lib/utils/money'

export default function OrganizationCard({ ...props }) {
  //console.log('ITEM', props?.data)
  const item  = props?.data || {}
  const count = item?.initiative?.length || 0
  const orgurl = '/organizations/'+item.id

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="relative h-40 p-3">
        <Link href={orgurl}>
          <Image
            src={item.image}
            alt="IMG BG"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col p-6 pt-3 gap-3">
        <Link href={orgurl}>
          <h3 className="h-[4rem] min-h-[4rem] text-2xl font-semibold uppercase text-ellipsis overflow-scroll">{item.name}</h3>
        </Link>
        <Separator />
        <p className="h-[200px] min-h-[200px] text-ellipsis overflow-scroll">{item.description}</p>
        <ul className="px-3 flex flex-col gap-2">
          <li className="inline-flex gap-2 text-sm">
            <DollarSign size={17} /> ${money(item?.lastmonth)} raised this month
          </li>
          <li className="inline-flex gap-2 text-sm">
            <Target size={17} /> {count} Initiative{count==1?'':'s'}
          </li>
          <li className="inline-flex gap-2 text-sm">
            <UserIcon size={17} /> {item.donors} Donor{item.donors==1?'':'s'}
          </li>
          <li className="inline-flex gap-2 text-sm">
            <Building2 size={17} /> {item.institutions} Institutional Donor{item.institutions==1?'':'s'}
          </li>
        </ul>
        <Separator />
        <Button>Donate</Button>
      </CardContent>
    </Card>
  );
}

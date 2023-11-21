"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from './ui/card';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { DateDisplay } from './ui/date-posted';
import { Button } from './ui/button';
import { Building2, UserIcon, DollarSign } from 'lucide-react';
import OrganizationAvatar from './OrganizationAvatar';
import money from '@/lib/utils/money'

const dummyImgSrc: string = "https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75";
//const dummyTitle: string = "Petting a dog";
//const dummyCreatedTimestamp: number = Date.now();
//const dummyDescription = "These siblings have been displaced, oh no! One is in the pacific, and the other in the atlantic. Alas! How can we rectify this? Leave it to us! Your donations go towards this heart-warming reunion."
//const dummyStats = {
//  amountTarget: 5000,
//  amountRaised: 1000,
//  donorCount: 35,
//  institutionalDonorCount: 3,
//}

export default function InitiativeCard({...props}) {
  //console.log('ITEM', props?.data)
  const item = props?.data || {}
  const initurl = '/initiatives/'+(item?.id || 0)
  let image = dummyImgSrc
  if(item?.imageUri){
    image = item?.imageUri.startsWith('ipfs') ? 'https://ipfs.filebase.io/ipfs/'+item.imageUri.substr(5) : item.imageUri
  }
  const startDate = new Date(item?.start).getTime()
  const progress = item.donations / item.goal * 100

  return (
    <Card className="flex flex-col overflow-hidden h-auto">
      <CardHeader className="relative h-72">
        <Link href={initurl}>
          <Image
            src={image}
            alt="IMG BG"
            fill style={{
              objectFit: 'cover',
            }}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col pb-8 pt-3 gap-3 px-0">
        <Link href={initurl}>
          <h3 className="h-[4rem] min-h-[4rem] px-6 pt-2 text-xl font-semibold uppercase text-ellipsis overflow-scroll">
            {item.title}
          </h3>
        </Link>
        <DateDisplay timestamp={startDate} /> 
        <p className="block px-6 h-[200px] min-h-[200px] text-ellipsis overflow-scroll">
          {item.description}
        </p>
        <Separator />
        <div className="px-6 pt-3">
          <Progress value={progress} />
        </div>
        <div className="px-6">
          <ul className="px-3 flex flex-col gap-2">
            <li className="inline-flex gap-3 text-sm font-semibold">
              <DollarSign size={17} /> ${money(item.lastmonth)} of ${money(item.goal)} raised this month
            </li>
            <li className="inline-flex gap-3 text-sm font-semibold">
              <UserIcon size={17} /> {item.donors} Donor{item.donors==1?'':'s'}
            </li>
            <li className="inline-flex gap-3 text-sm font-semibold">
              <Building2 size={17} /> {item.institutions} Institutional Donor{item.institutions==1?'':'s'}
            </li>
          </ul>
        </div>
        <Separator />
        <div className="px-6 pt-6 inline-flex justify-between">
          <OrganizationAvatar name={item?.organization?.name} description={item?.organization?.description} image={item?.organization?.image} />
          <Button className="mx-6 bg-transparent text-black dark:text-white outline outline-slate-300 outline-1">Donate</Button>
        </div>
      </CardContent>
    </Card>
  );
}
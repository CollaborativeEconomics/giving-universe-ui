"use client"
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { OrgStats } from './ui/org-stats';

export default function OrganizationCard({ ...props }) {
  const dummyOrganization = {
    stats: {
      amountRaised: 10000,
      amountTarget: 8000,
      donorCount: 50,
      institutionalDonorCount: 1,
    },
  }
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
          <h3 className="text-2xl font-semibold uppercase">{item.name}</h3>
        </Link>
        <Separator />
        <p>{item.description}</p>
        <div className="">
          <OrgStats orgStatProps={{
            amountRaised: dummyOrganization.stats.amountRaised,
            amountTarget: dummyOrganization.stats.amountTarget,
            donorCount: dummyOrganization.stats.donorCount,
            institutionalDonorCount: dummyOrganization.stats.institutionalDonorCount,
          }}
          />
        </div>
        <Separator />
        <Button>Donate</Button>
      </CardContent>
    </Card>
  );
}

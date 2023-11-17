"use client"
import Image from 'next/image';
import { Card, CardContent, CardHeader } from './ui/card';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { OrgStats } from './ui/org-stats';

export default function OrganizationCard({ ...props }) {
  //console.log('ITEM', props?.data)
  const item = props?.data || {};
  const count = item?.initiative?.length || 0;
  console.log(item?.initiative);

  const dummyOrganization = {
    stats: {
      amountRaised: 10000,
      amountTarget: 8000,
      donorCount: 50,
      institutionalDonorCount: 1,
    },
  }

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="relative h-40 p-3">
        <Image
          src={item.image}
          alt="IMG BG"
          fill style={{
            objectFit: 'cover',
          }}
        />
      </CardHeader>
      <CardContent className="flex flex-col p-6 pt-3 gap-3">
        <h3 className="text-2xl font-semibold uppercase">{item.name}</h3>
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

'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardHeader } from './ui/card'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { DateDisplay } from './ui/date-posted'
import { Button } from './ui/button'
import { OrgStats } from './ui/org-stats'
import OrganizationAvatar from './OrganizationAvatar'

const dummyImgSrc: string =
  'https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75'

export default function OrganizationCard({ ...props }) {
  const item = props?.data || {}
  const orgurl = '/organizations/' + (item?.id || 0)
  let image = dummyImgSrc
  if (item?.image) {
    image = item?.image.startsWith('ipfs')
      ? 'https://ipfs.filebase.io/ipfs/' + item.image.substr(5)
      : item.image
  }
  //const startDate = new Date(item?.start).getTime()
  const progress = (item.donations / item.goal) * 100

  return (
    <Card className="flex flex-col overflow-hidden h-auto">
      <CardHeader className="relative w-full aspect-[8/5]">
        <Link href={orgurl}>
          <Image
            src={image}
            alt="IMG BG"
            fill
            style={{
              objectFit: 'cover',
            }}
          />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-col pb-8 pt-3 gap-3 px-0">
        <Link href={orgurl}>
          <h3 className="h-[2rem] min-h-[2rem] px-6 pt-2 text-xl font-semibold uppercase text-ellipsis whitespace-nowrap overflow-hidden">
            {item.name}
          </h3>
        </Link>
        <p className="block h-[8-rem] min-h-[8rem] max-h-[8rem] px-6 py-2 text-ellipsis overflow-scroll">{item.description}</p>
        <Separator />
        <div className="px-6 pt-3">
          <OrgStats
            stats={{
              amountTarget: item?.goal || 0,
              amountRaised: item.donations,
              raisedThisMonth: item.lastmonth,
              initiativeCount: item.initiative?.length || 0,
              donorCount: item.donors,
              institutionalDonorCount: item.institutions,
            }}
          />
        </div>
        <Separator />
        <div className="px-2 pt-4 inline-flex justify-between">
          <Button className="mx-4 py-6 w-full bg-blue-600 text-white text-lg rounded-lg outline outline-slate-300 outline-1 hover:bg-blue-700 hover:shadow-inner">
            Donate
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

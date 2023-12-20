import Image from 'next/image'
import { Card, CardContent } from './ui/card'
import { Progress } from './ui/progress'
import { Separator } from './ui/separator'
import { DateDisplay } from './ui/date-posted'
import { Button } from './ui/button'
import { OrganizationAvatar } from './OrganizationAvatar'

export default function InitiativeCardCompact({ ...props }) {
  return (
    <Card className="flex flex-col overflow-hidden h-56">
      <CardContent className="flex flex-col pb-8 pt-3 gap-3 px-0">
        <div className="inline-flex">
          <Image
            className="mt-3 ml-6"
            src={props.imgSrc}
            alt="IMG BG"
            width={200}
            height={200}
          />
          <div>
            <h3 className="px-6 pt-2 text-xl font-semibold uppercase">
              {props.title}
            </h3>
            <DateDisplay timestamp={props.timestamp} className="py-4 px-6" />
            <div className="px-6 line-clamp-2">{props.description}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

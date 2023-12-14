import { OrganizationAvatar } from './OrganizationAvatar'
import { Card, CardContent, CardHeader } from './ui/card'
import { DateDisplay } from './ui/date-posted'
import Gallery from './ui/gallery'

export default function StoryCard({ ...props }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader>
        <OrganizationAvatar name={props.name} image={props.imgSrc} />
        <p className="text-sm font-semibold">
          in{' '}
          <span className="underline">
            <a href={props.address}>{props.name}</a>
          </span>
        </p>
        <DateDisplay timestamp={props.timestamp} className="py-4" />
      </CardHeader>
      <div className="px-2 -mt-2">
        <Gallery images={props.images} />
      </div>
      <CardContent className="flex flex-col pb-8 pt-3 gap-3 px-0">
        <p className="px-6">{props.description}</p>
      </CardContent>
    </Card>
  )
}

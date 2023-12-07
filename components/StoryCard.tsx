import { OrganizationAvatar } from './OrganizationAvatar'
import { Card, CardContent, CardHeader } from './ui/card'
import { DateDisplay } from './ui/date-posted'
import Gallery from './ui/gallery'

export default function StoryCard({ ...props }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader>
        <OrganizationAvatar name={props.data.name} image={props.data.imgSrc} />
        <p className="text-sm font-semibold">
          in{' '}
          <span className="underline">
            <a href={props.data.address}>{props.data.name}</a>
          </span>
        </p>
        <DateDisplay timestamp={props.data.timestamp} className="py-4" />
      </CardHeader>
      <div className="px-2 -mt-2">
        <Gallery images={props.data.images} />
      </div>
      <CardContent className="flex flex-col pb-8 pt-3 gap-3 px-0">
        <p className="px-6">{props.data.description}</p>
      </CardContent>
    </Card>
  )
}

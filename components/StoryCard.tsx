import { OrganizationAvatar } from './OrganizationAvatar'
import { Card, CardContent, CardHeader } from './ui/card'
import { DateDisplay } from './ui/date-posted'
import Gallery from './ui/gallery'

export default function StoryCard({ ...props }) {
  const item = props?.data || {}
  const organization = props?.organization || {}
  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader>
        <OrganizationAvatar name={organization.name} image={organization.image} avatarProps={{ title: organization.name }} />
        <p className="text-sm font-semibold">
          in <span className="underline"><a href={item.address}>{item.name}</a></span>
        </p>
        <DateDisplay timestamp={item.created} className="py-4" />
      </CardHeader>
      <div className="px-2 -mt-2">
        <Gallery images={[item.image]} />
      </div>
      <CardContent className="flex flex-col pb-8 pt-3 gap-3 px-0">
        <p className="px-6">
          {item.description}
        </p>
      </CardContent>
    </Card>
  )
}

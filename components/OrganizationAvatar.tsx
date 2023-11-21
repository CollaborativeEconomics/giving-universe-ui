import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Props {
  organizationId?: string; // eventually required
  name?: string;
  description?: string;
  image?: string;
}

export default function OrganizationAvatar(props: Props) {
  const name = props?.name || 'No name'
  const description = props?.description || 'No description provided'
  const image = props?.image || 'https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75'
  return (
    <div className="flex flex-row items-center gap-3">
      <Avatar>
        <AvatarImage
          src={image}
          alt={name}
        />
        <AvatarFallback>OT</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h4 className="w-28 h-4 text-sm font-semibold uppercase text-ellipsis overflow-hidden">
          {name}
        </h4>
        <h5 className="w-28 h-8 text-xs opacity-75 text-ellipsis overflow-hidden">{description}</h5>
      </div>
    </div>
  );
}

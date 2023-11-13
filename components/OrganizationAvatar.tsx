import { Avatar, AvatarFallback, AvatarImage, AvatarProps, AvatarTitle} from './ui/avatar';

interface Props {
  organizationId?: string; // eventually required
  avatarProps?: AvatarProps;
}

export default function OrganizationAvatar(props: Props) {
  return (
    <div className="flex flex-row items-center gap-3">
      <Avatar size={props.avatarProps?.size}>
        <AvatarImage
          src="https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75"
          alt="Organization Name"
        />
        <AvatarFallback>OT</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <AvatarTitle size={props.avatarProps?.size} title={props.avatarProps?.title}/>
      </div>
    </div>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface Props {
  organizationId?: string; // eventually required
}

export default function OrganizationAvatar(props: Props) {
  return (
    <div className="flex flex-row items-center gap-3">
      <Avatar>
        <AvatarImage
          src="https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75"
          alt="Organization Name"
        />
        <AvatarFallback>OT</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <h4 className="text-sm font-semibold uppercase text-black">
          Organization Name
        </h4>
        <h5 className="text-xs text-black opacity-75">We do things</h5>
      </div>
    </div>
  );
}

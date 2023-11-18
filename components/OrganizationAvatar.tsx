import { cn } from '@/lib/shadCnUtil';
import { Avatar, AvatarFallback, AvatarImage, AvatarProps, AvatarTitle } from './ui/avatar';
import React from 'react';

interface Props
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string,
  organizationId?: string; // eventually required
  avatarProps?: AvatarProps;
}

const OrganizationAvatar = React.forwardRef<HTMLDivElement, Props>(
  ({ className, avatarProps, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("flex flex-row items-center gap-3",
          className
        )}
        {...props}
      >
        <Avatar size={avatarProps?.size}>
          <AvatarImage
            src="https://partners.cfce.io/_next/image?url=https%3A%2F%2Fipfs.filebase.io%2Fipfs%2FQmcS3rZdEzNkYxSd79AJVgjkDpK7sBd1ej99i4sBXD1mkQ&w=256&q=75"
            alt="Organization Name"
          />
          <AvatarFallback>OT</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <AvatarTitle size={avatarProps?.size} title={avatarProps?.title} />
        </div>
      </div>
    )
  }
)
OrganizationAvatar.displayName = "OrganizationAvatar"

export { OrganizationAvatar }
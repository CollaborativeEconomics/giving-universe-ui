import * as React from "react"

import { cn } from "@/lib/shadCnUtil"

export interface LinkProps
    extends React.HTMLAttributes<HTMLElement> {
    className?:string,
    label: string,
    address: string,
}

const Link = React.forwardRef<HTMLElement, LinkProps>(
    ({ className, label, address, ...props }, ref) => {
        return (
            <p
                className={cn("underline",
                    className
                )}
                {...props}
            >
                <a href={address}>{label}</a>
            </p>
        )
    }
)
Link.displayName = "Link"

export { Link }
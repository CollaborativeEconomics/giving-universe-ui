import * as React from "react"

import { cn } from "@/lib/shadCnUtil"

export interface LinkProps
    extends React.HTMLAttributes<HTMLParagraphElement> {
    className?: string,
    label: string,
    address: string,
}

const Link = React.forwardRef<HTMLParagraphElement, LinkProps>(
    ({ className, label, address, ...props }, ref) => {
        return (
            <p
                ref={ref}
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
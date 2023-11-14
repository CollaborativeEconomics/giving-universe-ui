import * as React from "react"

import { cn } from "@/lib/shadCnUtil"
import { LucideIcon } from "lucide-react"

export interface ListObjectProps
    extends React.HTMLAttributes<HTMLElement> {
    Icon: LucideIcon,
    text: string,
}

const ListObject = React.forwardRef<HTMLElement, ListObjectProps>(
    ({ className, Icon, text, ...props }, ref) => {
        return (
            <li
                className={cn(
                    "inline-flex gap-3 text-sm font-semibold",
                    className
                )}
                {...props}
            >
                <Icon size={17} />
                {text}
            </li>
        )
    }
)
ListObject.displayName = "list-object"

export { ListObject }
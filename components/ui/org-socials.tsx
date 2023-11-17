import * as React from "react"

import { cn } from "@/lib/shadCnUtil"
import { Globe, Twitter, Facebook } from "lucide-react"
import { Link } from "./link"

export interface OrgSocialsProps
    extends React.HTMLAttributes<HTMLDivElement> {
    className?: string,
    twitterLabel: string,
    twitterAddress: string,
    facebookLabel: string,
    facebookAddress: string,
    websiteLabel: string,
    websiteAddress: string,
}

const OrgSocials = React.forwardRef<HTMLDivElement, OrgSocialsProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn("absolute flex flex-wrap",
                    className,
                )}
            >
                <div className="flex gap-x-1">
                    <Globe size={17} /> <Link className="text-sm font-semibold" label={props.websiteLabel} address={props.websiteAddress} />
                </div>
                <div className="flex gap-x-1">
                    <Twitter size={17} /> <Link className="text-sm font-semibold" label={props.twitterAddress} address={props.twitterAddress} />
                </div>
                <div className="flex gap-x-1">
                    <Facebook size={17} /> <Link className="text-sm font-semibold" label={props.facebookAddress} address={props.facebookAddress} />
                </div>
            </div>
        )
    }
)
OrgSocials.displayName = "org-socials"

export { OrgSocials }
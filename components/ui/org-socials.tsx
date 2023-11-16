import * as React from "react"

import { cn } from "@/lib/shadCnUtil"
import { Globe, Twitter, Facebook } from "lucide-react"
import { Link } from "./link"

export interface OrgSocialsProps
    extends React.HTMLAttributes<HTMLElement> {
    className?: string,
    twitterLabel: string,
    twitterAddress: string,
    facebookLabel: string,
    facebookAddress: string,
    websiteLabel: string,
    websiteAddress: string,
}

const OrgSocials = React.forwardRef<HTMLElement, OrgSocialsProps>(
    ({ className, ...props }) => {
        return (
            <div
                className={cn("absolute flex flex-wrap pt-[25rem] ml-48 px-[10%] sm:gap-1 lg:gap-3",
                    className,
                )}
            >
                <Globe size={17} /> <Link className="text-sm font-semibold" label={props.websiteLabel} address={props.websiteAddress} />
                <Twitter size={17} /> <Link className="text-sm font-semibold" label={props.twitterAddress} address={props.twitterAddress} />
                <Facebook size={17} /> <Link className="text-sm font-semibold" label={props.facebookAddress} address={props.facebookAddress} />
            </div>
        )
    }
)
OrgSocials.displayName = "org-socials"

export { OrgSocials }
import * as React from "react"

import { cn } from "@/lib/shadCnUtil"
import { Building2, DollarSign, LucideIcon, Target, UserIcon } from "lucide-react"
import { ListObject } from "./list-object"

export interface OrgStatsProps {
    amountRaised: number,
    amountTarget: number,
    raisedThisMonth?: number,
    donorCount: number,
    institutionalDonorCount: number,
    initiativeCount?: number,
}

export interface Props
    extends React.HTMLAttributes<HTMLElement> {
    className?: string,
    orgStatProps: OrgStatsProps,
}

function buildList(props: OrgStatsProps): Array<React.JSX.Element> {
    var items = new Array<React.JSX.Element>();
    items.push(<ListObject Icon={DollarSign} text={"$" + props.amountRaised.toLocaleString() + " of $" + props.amountTarget.toLocaleString() + " raised"} />);
    if (props.raisedThisMonth) {
        items.push(<ListObject Icon={DollarSign} text={"$ " + props.raisedThisMonth.toLocaleString() + " this month"} />);
    }
    items.push(<ListObject Icon={UserIcon} text={props.donorCount + " Donors"} />);
    items.push(<ListObject Icon={Building2} text={props.institutionalDonorCount + " Institutional Donors"} />);
    if (props.initiativeCount) {
        items.push(<ListObject Icon={Target} text={"Initiative count: " + props.initiativeCount} />);
    }
    return items;
}

const OrgStats = React.forwardRef<HTMLElement, Props>(
    ({ className, orgStatProps, ...props }) => {
        return (
            <div className="px-6">
                <ul
                    className={cn(
                        "px-3 flex flex-col gap-2",
                        className
                    )}
                    {...props}
                >
                    {...buildList(orgStatProps)}
                </ul>
            </div>
        )
    }
)
OrgStats.displayName = "org-stats"

export { OrgStats }

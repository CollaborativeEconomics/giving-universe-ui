import * as React from 'react'

import { cn } from '@/lib/shadCnUtil'
import { Building2, DollarSign, Target, UserIcon } from 'lucide-react'
import { ListObject } from './list-object'
import money from '@/lib/utils/money'

export interface Stats {
  amountRaised: number
  amountTarget: number
  raisedThisMonth?: number
  donorCount: number
  institutionalDonorCount: number
  initiativeCount?: number
}

export interface Props extends React.HTMLAttributes<HTMLUListElement> {
  className?: string
  stats: Stats
}

function buildList(props: Stats): Array<React.JSX.Element> {
  const items = new Array<React.JSX.Element>()
  items.push(
    <ListObject
      Icon={DollarSign}
      text={
        money(props.amountRaised) +
        ' of ' +
        money(props.amountTarget) +
        ' raised'
      }
    />
  )
  if (props.raisedThisMonth) {
    items.push(
      <ListObject
        Icon={DollarSign}
        text={'$ ' + props.raisedThisMonth.toLocaleString() + ' this month'}
      />
    )
  }
  const donorPlural = props.donorCount == 1 ? '' : 's'
  items.push(
    <ListObject
      Icon={UserIcon}
      text={props.donorCount + ' Donor' + donorPlural}
    />
  )
  const institutionalDonorPlural = props.institutionalDonorCount == 1 ? '' : 's'
  items.push(
    <ListObject
      Icon={Building2}
      text={
        props.institutionalDonorCount +
        ' Institutional Donor' +
        institutionalDonorPlural
      }
    />
  )
  if (props.initiativeCount) {
    items.push(
      <ListObject
        Icon={Target}
        text={'Initiative count: ' + props.initiativeCount}
      />
    )
  }
  return items
}

const OrgStats = React.forwardRef<HTMLUListElement, Props>(
  ({ className, stats, ...props }, ref) => {
    return (
      <ul
        ref={ref}
        className={cn('px-3 flex flex-col gap-2', className)}
        {...props}
      >
        {buildList(stats).map((item) => {
          return <div key={item.key}>{item}</div>
        })}
      </ul>
    )
  }
)
OrgStats.displayName = 'org-stats'

export { OrgStats }

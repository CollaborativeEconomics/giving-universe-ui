'use client'

import { Button } from '../ui/button'
import { ActionBarBox, ActionBarButton } from './ActionBarContent'

export default function ActionBar() {
  return (
    <div className="flex flex-col md:flex-row gap-4 h-auto min-h-[350px] w-full bg-slate-400 bg-opacity-50 mt-8 backdrop-blur-md justify-center">
      <ActionBarBox>
        <h3 className="text-2xl font-semibold">Become a Donor</h3>
        <span className="mx-8">
          Find causes you care about that are making a real difference in the
          world. Funding initiatives give you a real-world insight into causes
          you care about, what their needs are, and how your donation directly
          contributes to the story as it unfolds.
        </span>
        <div className="flex flex-row gap-3">
          <ActionBarButton>Find Organizations</ActionBarButton>
          <ActionBarButton>Find Initiatives</ActionBarButton>
        </div>
      </ActionBarBox>
      <ActionBarBox>
        <h3 className="text-2xl font-semibold">
          Start Accepting Crypto Donations
        </h3>
        <span className="mx-8">
          Digital currencies are the future of commerce. Future-proof your
          non-profit, and gain a dedicated new donor-base, free of the tedium of
          grant-writing. For foundations, you can secure new funding sources for
          your non-profits.
        </span>
        <div className="flex flex-row gap-3">
          <ActionBarButton>Sign Up</ActionBarButton>
        </div>
      </ActionBarBox>
    </div>
  )
}

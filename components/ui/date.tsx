'use client';

import { cn } from '@/lib/shadCnUtil';
import * as React from 'react';

const DateDisplay = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("px-6 h-2 inline-flex gap-2 items-center text-slate-500", className)}
        {...props}
    />
))
DateDisplay.displayName = "DateDisplay"

const DateString = (
    (
        { ...props }) => (
        convertTimestampToDateString(props.timestamp)
    )
)

function convertTimestampToDateString(timestamp: number): string {
    const timestampDate = new Date(timestamp);
    return timestampDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
}

export { DateDisplay, DateString };

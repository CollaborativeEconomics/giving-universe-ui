'use client';

import { cn } from '@/lib/shadCnUtil';
import { CalendarDays } from 'lucide-react';
import * as React from 'react';

interface Props {
    timestamp: number;
    className?: string;
}

export default function DateDisplay(props: Props) {
    return (
        <DateStyle className={props.className}>
            <CalendarDays size={17} /> {convertTimestampToDateString(props.timestamp)}
        </DateStyle>
    )
}

const DateStyle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("px-6 h-2 inline-flex gap-2 items-center text-slate-500", className)}
        {...props}
    />
))
DateStyle.displayName = "DateDisplay"

function convertTimestampToDateString(timestamp: number): string {
    const timestampDate = new Date(timestamp);
    return timestampDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
}

export { DateDisplay };

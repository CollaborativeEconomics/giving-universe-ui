'use client';

import * as React from 'react';

const DateString = (
    ( 
        {...props}) => (
             convertTimestampToDateString(props.timestamp)
             )
)

function convertTimestampToDateString(timestamp: number):string {
    const timestampDate = new Date(timestamp);
    return timestampDate.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' });
}

export { DateString };

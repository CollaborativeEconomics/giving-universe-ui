import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React from 'react';
import CategorySelect from './CategorySelect';
import LocationSelect from './LocationSelect';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InitiativeOrgSwitch from './InitiativeOrgSwitch';

export default function SearchBar() {
  return (
    <CardContent className="p-3 w-full">
      <div className="flex w-full space-x-2">
        <InitiativeOrgSwitch />
        <Input type="search" placeholder="Search" className="flex-1" />
        <CategorySelect />
        <LocationSelect />
        <Button type="submit">Search</Button>
      </div>
    </CardContent>
  );
}

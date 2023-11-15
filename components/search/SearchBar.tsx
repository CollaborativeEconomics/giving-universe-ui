"use client"
import { useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import React from 'react';
import CategorySelect from './CategorySelect';
import LocationSelect from './LocationSelect';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InitiativeOrgSwitch from './InitiativeOrgSwitch';

export default function SearchBar(props:any) {
  const text = props?.text || ''
  const router = useRouter();
  const [query, setQuery] = useState(text)
  function checkEnter(evt:KeyboardEvent){
    if(evt.keyCode==13){
      search()
    }
  }
  function search(){
    //console.log('SEARCHBAR', query)
    if(query){
      router.push(`?search=${query}`)
    } else {
      router.push('?')
    }
  }
  return (
    <CardContent className="p-3 w-full">
      <div className="flex w-full space-x-2">
        <InitiativeOrgSwitch />
        <Input type="search" placeholder="Search" className="flex-1" value={query} onChange={(evt)=>setQuery(evt.target.value)} onKeyDown={checkEnter} />
        <CategorySelect />
        <LocationSelect />
        <Button type="submit" onClick={search}>Search</Button>
      </div>
    </CardContent>
  );
}

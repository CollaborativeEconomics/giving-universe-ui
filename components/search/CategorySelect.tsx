'use client';

import { useState } from 'react';

import { cn } from '@/lib/shadCnUtil';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CheckCircledIcon, ChevronDownIcon } from '@radix-ui/react-icons';

const categories = [
  { value: 'poverty', label: 'No Poverty' },
  { value: 'hunger', label: 'Zero Hunger' },
  { value: 'health_well_being', label: 'Good Health and Well-being' },
  { value: 'education', label: 'Quality Education' },
  { value: 'gender_equality', label: 'Gender Equality' },
  { value: 'water', label: 'Clean Water and Sanitation' },
  { value: 'clean_energy', label: 'Affordable and Clean Energy' },
  { value: 'economic_growth', label: 'Decent Work and Economic Growth' },
  { value: 'innovation', label: 'Industry, Innovation, and Infrastructure' },
  { value: 'reduced_inequality', label: 'Reduced Inequality' },
  { value: 'sustainable_communities', label: 'Sustainable Cities and Communities' },
  { value: 'responsible_consumption', label: 'Responsible Consumption and Production' },
  { value: 'climate_action', label: 'Climate Action' },
  { value: 'life_below_water', label: 'Life Below Water' },
  { value: 'life_on_land', label: 'Life on Land' },
  { value: 'peace_justice', label: 'Peace, Justice, and Strong Institutions' },
  { value: 'partnerships', label: 'Partnerships for the Goals' },
];

export default function CategorySelect(props:any) {
  const onChange = props?.onChange;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? categories.find(item => item.value === value)?.label
            : 'Select category...'}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandEmpty>No category found.</CommandEmpty>
          <CommandGroup>
            {categories.map(item => (
              <CommandItem
                key={item.value}
                onSelect={currentValue => {
                  console.log('CAT', currentValue, 'OLD', value)
                  setValue(item.value);
                  onChange(item.value);
                  setOpen(false);
                }}
              >
                <CheckCircledIcon
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === item.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

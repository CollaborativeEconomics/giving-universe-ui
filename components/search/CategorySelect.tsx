'use client';

import * as React from 'react';

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
  { value: 'noPoverty', label: 'No Poverty' },
  { value: 'zeroHunger', label: 'Zero Hunger' },
  { value: 'goodHealthAndWellBeing', label: 'Good Health and Well-being' },
  { value: 'qualityEducation', label: 'Quality Education' },
  { value: 'genderEquality', label: 'Gender Equality' },
  { value: 'cleanWaterAndSanitation', label: 'Clean Water and Sanitation' },
  { value: 'affordableAndCleanEnergy', label: 'Affordable and Clean Energy' },
  {
    value: 'decentWorkAndEconomicGrowth',
    label: 'Decent Work and Economic Growth',
  },
  {
    value: 'industryInnovationAndInfrastructure',
    label: 'Industry, Innovation, and Infrastructure',
  },
  { value: 'reducedInequality', label: 'Reduced Inequality' },
  {
    value: 'sustainableCitiesAndCommunities',
    label: 'Sustainable Cities and Communities',
  },
  {
    value: 'responsibleConsumptionAndProduction',
    label: 'Responsible Consumption and Production',
  },
  { value: 'climateAction', label: 'Climate Action' },
  { value: 'lifeBelowWater', label: 'Life Below Water' },
  { value: 'lifeOnLand', label: 'Life on Land' },
  {
    value: 'peaceJusticeAndStrongInstitutions',
    label: 'Peace, Justice, and Strong Institutions',
  },
  { value: 'partnershipsForTheGoals', label: 'Partnerships for the Goals' },
];

export default function CategorySelect() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

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
            ? categories.find(framework => framework.value === value)?.label
            : 'Select category...'}
          <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {categories.map(framework => (
              <CommandItem
                key={framework.value}
                onSelect={currentValue => {
                  setValue(currentValue === value ? '' : currentValue);
                  setOpen(false);
                }}
              >
                <CheckCircledIcon
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === framework.value ? 'opacity-100' : 'opacity-0',
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

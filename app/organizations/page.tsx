import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategorySelect } from '@/components/search';
import LocationSelect from '@/components/search/LocationSelect';
import SearchBar from '@/components/search/SearchBar';
import OrganizationCard from '@/components/OrganizationCard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-stretch container pt-24">
      <Card className="flex">
        <SearchBar />
      </Card>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pt-10">
        <OrganizationCard />
        <OrganizationCard />
        <OrganizationCard />
        <OrganizationCard />
        <OrganizationCard />
        <OrganizationCard />
        <OrganizationCard />
        <OrganizationCard />
      </div>
      {/*</TabsContent>
        <TabsContent value="organizations">
          Change your password here.
        </TabsContent> */}
      {/* </Tabs> */}
    </main>
  );
}

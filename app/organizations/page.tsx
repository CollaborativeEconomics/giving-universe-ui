import Main from '@/components/ui/main'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategorySelect } from '@/components/search';
import LocationSelect from '@/components/search/LocationSelect';
import SearchBar from '@/components/search/SearchBar';
import OrganizationCard from '@/components/OrganizationCard';
import { searchOrganizations } from '@/lib/utils/registry';

export default async function Organizations(props:any) {
  const query = props?.searchParams?.search || ''
  console.log('SEARCH', query)
  const data = await searchOrganizations(query) || []
  console.log('ORGS', data.length)

  return (
    <Main>
      <Card className="flex">
        <SearchBar />
      </Card>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pt-10">
        { data?.length>0 ? data.map((item:any) => (
          <OrganizationCard key={item.id} data={item} />
        )) : (
          <h1 className="m-4">No organizations found</h1>
        )}
      </div>
      {/*</TabsContent>
        <TabsContent value="organizations">
          Change your password here.
        </TabsContent> */}
      {/* </Tabs> */}
    </Main>
  );
}

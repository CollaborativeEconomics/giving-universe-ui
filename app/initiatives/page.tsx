import Main from '@/components/ui/main'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategorySelect } from '@/components/search';
import LocationSelect from '@/components/search/LocationSelect';
import SearchBar from '@/components/search/SearchBar';
import InitiativeCard from '@/components/initiativeCard';
import { searchInitiatives } from '@/lib/utils/registry';

export default async function Initiatives(props:any) {
  const query = props?.searchParams?.search || ''
  console.log('SEARCH', query)
  const data = await searchInitiatives(query) || []
  console.log('INITS', data.length)

  return (
    <main className="flex min-h-screen flex-col items-stretch container pt-24">
      <Card className="flex">
        <SearchBar />
      </Card>
      {/* <TabsContent value="initiatives">*/}
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pt-10">
        { data?.length>0 ? data.map((item:any) => (
          <InitiativeCard key={item.id} data={item} />
        )) : (
          <h1 className="m-4">No initiatives found</h1>
        )}
      </div>
      {/*</TabsContent>
        <TabsContent value="organizations">
          Change your password here.
        </TabsContent> */}
      {/* </Tabs> */}
    </main>
  );
}

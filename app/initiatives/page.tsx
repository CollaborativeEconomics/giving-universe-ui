import Main from '@/components/ui/main'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CategorySelect } from '@/components/search';
import LocationSelect from '@/components/search/LocationSelect';
import SearchBar from '@/components/search/SearchBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import InitiativeCard from '@/components/initiativeCard';
import { searchInitiatives } from '@/lib/utils/registry';

export default async function Initiatives(props:any) {
  const query    = props?.searchParams?.query || ''
  const category = props?.searchParams?.category || ''
  const location = props?.searchParams?.location || ''
  console.log('SEARCH', query, category, location)
  const data = await searchInitiatives(query, category, location) || []
  console.log('INITS', data.length)

  return (
    <Main>
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
    </Main>
  );
}

import { Card } from '@/components/ui/card';
import SearchBar from '@/components/search/SearchBar';
import InitiativeCard from '@/components/initiativeCard';
import { getInitiatives } from '@/lib/utils/registry';

export default async function Initiatives() {
  const data = await getInitiatives() || []
  console.log('INITS', data.length)

  return (
    <main className="flex min-h-screen flex-col items-stretch container pt-24">
      <Card className="flex">
        <SearchBar />
      </Card>
      {/* <TabsContent value="initiatives">*/}
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pt-10">
        { data?.length>0 ? data.map((item: Element) => (
          <InitiativeCard key={item.id} data={item} />
        )) : (
          <h1 className="m-4">No initiatives found</h1>
        )}
      </div>
    </main>
  );
}
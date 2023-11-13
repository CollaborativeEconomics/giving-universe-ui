import { Card } from '@/components/ui/card';
import SearchBar from '@/components/search/SearchBar';
import InitiativeCard from '@/components/initiativeCard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-stretch container pt-24">
      {/* <Tabs> */}
      <Card className="flex">
        <SearchBar />
      </Card>
      {/* <TabsContent value="initiatives">*/}
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pt-10">
        <InitiativeCard />
        <InitiativeCard />
        <InitiativeCard />
        <InitiativeCard />
        <InitiativeCard />
        <InitiativeCard />
        <InitiativeCard />
        <InitiativeCard />
      </div>
      {/*</TabsContent>
        <TabsContent value="organizations">
          Change your password here.
        </TabsContent> */}
      {/* </Tabs> */}
    </main>
  );
}

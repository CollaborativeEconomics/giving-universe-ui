import { Card } from '@/components/ui/card';
import SearchBar from '@/components/search/SearchBar';
import OrganizationCard from '@/components/OrganizationCard';
import { searchOrganizations } from '@/lib/utils/registry';

export default async function Home(props:any) {
  const query = props?.searchParams?.search || ''
  console.log('SEARCH', query)
  const data = await searchOrganizations(query) || []
  console.log('ORGS', data.length)

  return (
    <main className="flex min-h-screen flex-col items-stretch container pt-24">
      <Card className="flex">
        <SearchBar />
      </Card>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 pt-10">
        { data?.length>0 ? data.map((item:any) => (
          <OrganizationCard key={item.id} data={item} />
        )) : (
          <h1 className="m-4">No initiatives found</h1>
        )}
      </div>
    </main>
  );
}
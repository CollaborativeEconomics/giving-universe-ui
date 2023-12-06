import Main from '@/components/ui/main'
import { Card } from '@/components/ui/card'
import SearchBar from '@/components/search/SearchBar'
import DonationForm from '@/components/DonationForm'

export default function Handler(props: any) {
  const query = props?.searchParams?.query || ''
  const category = props?.searchParams?.category || ''
  const location = props?.searchParams?.location || ''
  console.log('SEARCH', query, category, location)

  return (
    <Main>
      <Card className="flex">
        <SearchBar />
      </Card>
      <div className="m-4">Main stuff here...</div>
      <DonationForm />
    </Main>
  )
}

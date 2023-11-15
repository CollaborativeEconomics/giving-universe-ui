import Link from 'next/link'
import Main from '@/components/ui/main'
import { Card } from '@/components/ui/card'
import SearchBar from '@/components/search/SearchBar'

export default function Handler(props:any) {
  const query = props?.searchParams?.search || ''
  console.log('SEARCH', query)
  return (
    <Main>
      <Card className="flex">
        <SearchBar />
      </Card>
      <div className="m-4">
        Main stuff here...
      </div>
    </Main> 
  )
} 
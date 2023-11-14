import Link from 'next/link'
import Main from '@/components/ui/main'
import { Card } from '@/components/ui/card'
import SearchBar from '@/components/search/SearchBar'

export default function Handler() {
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
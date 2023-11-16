//import { searchInitiatives } from '@/lib/utils/registry'
import { searchOrganizations } from '@/lib/utils/registry'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('search')
  console.log('QUERY', q)
  //const data = await searchInitiatives(q)
  const data = await searchOrganizations(q)
  console.log('RESULT', data?.length)
  return Response.json(data)
}

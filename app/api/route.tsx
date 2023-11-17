//import { searchInitiatives } from '@/lib/utils/registry'
import { searchOrganizations } from '@/lib/utils/registry'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const q = url.searchParams.get('query')    || ''
  const c = url.searchParams.get('category') || ''
  const l = url.searchParams.get('location') || ''
  console.log('SEARCH', q, c, l)
  //const data = await searchInitiatives(q,c,l)
  const data = await searchOrganizations(q,c,l)
  console.log('RESULT', data?.length)
  return Response.json(data)
}

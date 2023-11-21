import Main from '@/components/ui/main'
import { getOrganizationById } from '@/lib/utils/registry'

export default async function Organization(props:any) {
  console.log('PROPS', props)
  const orgid = props?.params?.id || null
  const data = await getOrganizationById(orgid) || {}
  console.log('ORG', data)

  return (
    <Main>
      <div>
        <h1>{data?.name || 'No name'}</h1>
        <div>{data?.description || 'Nothing to see here'}</div>
      </div>
    </Main>
  );
}

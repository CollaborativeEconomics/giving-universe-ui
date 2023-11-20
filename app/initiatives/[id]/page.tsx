import Main from '@/components/ui/main'
import { getInitiativeById } from '@/lib/utils/registry'

export default async function Initiative(props:any) {
  console.log('PROPS', props)
  const initid = props?.params?.id || null
  const data = await getInitiativeById(initid) || {}
  console.log('INIT', data)

  return (
    <Main>
      <div>
        <h1>{data?.title || 'No title'}</h1>
        <div>{data?.description || 'Nothing to see here'}</div>
      </div>
    </Main>
  );
}

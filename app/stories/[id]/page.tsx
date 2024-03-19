import StoryPage from '@/components/StoryPage'
import NotFound  from '@/components/NotFound'
import { getStoryById } from '@/lib/utils/registry'

export default async function Story(props: any) {
  const storyid = props?.params?.id || null
  const story = await getStoryById(storyid)

  if(!story){ return <NotFound /> }

  return (
    <main className="flex min-h-screen flex-col items-stretch container mt-12 pt-24">
      <StoryPage story={story} />
    </main>
  )
}

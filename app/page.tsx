import Main from '@/components/ui/main'
import VideoBackground from '@/components/home/VideoBackground'
import ImpactCarousel from '@/components/home/ImpactCarousel'
import ActionBar from '@/components/home/ActionBar'
import InstructionPanes from '@/components/home/InstructionPanes'

export default function Handler(props: any) {
  const query = props?.searchParams?.query || ''
  const category = props?.searchParams?.category || ''
  const location = props?.searchParams?.location || ''
  console.log('SEARCH', query, category, location)
  return (
    <>
      <div className="absolute h-screen w-full top-0">
        <div className="container mt-48 mb-16 ml-6 md:ml-auto">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-accent-foreground">
            Blockchain-driven philanthropy <br />
            for a transparent world
          </h1>

          <p className="pt-4 w-[95%] md:w-[60%]">
            With the increased transparency that blockchain donations provide,
            meaningful initiatives combine with donor generosity to to tell the
            story of real world impact.
          </p>
        </div>
        <ImpactCarousel />
        <ActionBar />
        <InstructionPanes />
        <VideoBackground />
      </div>
      <Main></Main>
    </>
  )
}

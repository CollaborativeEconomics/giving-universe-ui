import Link from 'next/link';
import Main from '@/components/ui/main';

import { Card } from '@/components/ui/card';
import SearchBar from '@/components/search/SearchBar';
import VideoBackground from '@/components/home/VideoBackground';
import ImpactCarousel from '@/components/home/ImpactCarousel';

export default function Handler(props: any) {
  const query = props?.searchParams?.query || '';
  const category = props?.searchParams?.category || '';
  const location = props?.searchParams?.location || '';
  console.log('SEARCH', query, category, location);
  return (
    <>
      <div className="absolute h-screen w-full top-0">
        <div className='container mt-48'>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-accent-foreground">
            Blockchain-driven Philanthropy <br />
            for a transparent world
          </h1>
        </div>
        <ImpactCarousel />
        <VideoBackground />
      </div>
      <Main></Main>
    </>
  );
}

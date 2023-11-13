import { ReactChild } from 'react';

interface MainProps {
  children?: ReactChild;
  className?: string;
}

const Main = ({ className, children }: MainProps) => {
  return (
    <main className={`flex min-h-screen flex-col items-stretch container mt-24 ${className||''}`}>
      {children}
    </main>
  )
}

export default Main
import { RefObject, useEffect, useRef } from 'react'

interface ParallaxProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  speed?: number
}

const Parallax = (props: ParallaxProps) => {
  const parallaxRef = useRef(null)
  useParallax(parallaxRef, props.speed ?? 0.5) // Adjust speed as needed

  return (
    <div {...props} ref={parallaxRef} className={`parallax ${props.className}`}>
      {props.children}
    </div>
  )
}

export const useParallax = (ref: RefObject<HTMLDivElement>, speed = 0.5) => {
  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const elementOffset =
          ref.current.getBoundingClientRect().top + window.scrollY
        const scrollPosition = window.scrollY
        const dynamicOffset = scrollPosition - elementOffset
        ref.current.style.backgroundPositionY = dynamicOffset * speed + 'px'
      }
    }

    // Initial call to set up the correct position
    if (ref.current) {
      const initialOffset =
        ref.current.getBoundingClientRect().top + window.scrollY
      ref.current.style.backgroundPositionY = -initialOffset * speed + 'px'
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [ref, speed])
}

export default Parallax

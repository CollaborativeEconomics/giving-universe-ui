'use client'

import React, { useState, useEffect, useRef } from 'react'
import { InstructionPaneSectionOverlay } from './InstructionPaneSection'
const OverlayHandler = () => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = useState(0)
  console.log('in overlay handler')

  // Intersection Observer to detect when overlay is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', handleScroll)
        } else {
          window.removeEventListener('scroll', handleScroll)
        }
      },
      { threshold: 0.1 }
    )

    if (overlayRef.current) {
      observer.observe(overlayRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [overlayRef])

  // Handle scroll and calculate progress
  const handleScroll = () => {
    const element = overlayRef.current
    if (element) {
      const windowHeight = window.innerHeight
      const rect = element.getBoundingClientRect()
      const elementVisible = rect.top - windowHeight < 0
      const scrollableDistance = windowHeight // 62% of the way down
      let newOpacity = 0

      if (elementVisible) {
        newOpacity = 1 - rect.top / scrollableDistance
        if (newOpacity > 1) {
          newOpacity = 2 - newOpacity
        }
        newOpacity /= 2
        setOpacity(newOpacity)
        console.log(opacity)
      }

      setOpacity(newOpacity)
    }
  }

  // const scrollY = window.scrollY
  // const height = document.documentElement.scrollHeight - window.innerHeight
  // const scrolled = scrollY / height
  // // Calculate opacity
  // const newOpacity = Math.abs(scrolled * 2 - 1) // Creates a peak at 50% scroll
  // setOpacity(newOpacity)

  console.log(opacity)
  return (
    <div
      ref={overlayRef}
      style={{ opacity: opacity }}
      // className="transition-opacity ease-in-out duration-1000"
    >
      <InstructionPaneSectionOverlay />
    </div>
  )
}

export { OverlayHandler }

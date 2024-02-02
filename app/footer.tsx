'use client';
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
  return (
    <footer className={`w-full mt-10 py-20 bg-white dark:bg-accent`}>
      <div className="flex justify-between container">
        <div>
          <Link href="/" className='block'>
            <Image
              src="/GivingUniverseLogoV1.svg"
              alt="Giving Universe"
              className="dark:invert"
              width={200}
              height={40}
              priority
            />
          </Link>
          <p className='ml-10'>by Center For Collaborative Economics</p>
        </div>
        <div>
          <Link href="/" className='block'>Our Mission</Link>
          <Link href="/" className='block'>Our Partners</Link>
          <Link href="/" className='block'>Privacy Policy</Link>
          <Link href="/" className='block'>Terms and Conditions</Link>
        </div>
        <div>
          <h1 className='font-bold'>Follow Us:</h1>
          <Link href="/" className='block'>• Discord</Link>
          <Link href="/" className='block'>• Twitter</Link>
          <Link href="/" className='block'>• Facebook</Link>
          <Link href="/" className='block'>• Instagram</Link>
        </div>
      </div>
    </footer>
  )
}

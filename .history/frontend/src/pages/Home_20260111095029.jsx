import React from 'react'
import { Hero } from '../components/Hero'
import { LatestCollection } from '../components/LatestCollection'
import { BestSellers } from '../components/BestSellers'
import { OurPolicy } from '../components/OurPolicy'
import { NewsLetterBox } from '../components/NewsLetterBox'

export const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSellers/>
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

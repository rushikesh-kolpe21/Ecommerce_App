import React from 'react'
import { Hero } from '../components/Hero'
import { LatestCollection } from '../components/LatestCollection'
import { BestSellers } from '../components/BestSellers'

export const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSellers/>
    </div>
  )
}

import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Categories from '../components/Categories'
import SubCategory from '../components/SubCategory'
import InfluencerSpotlight from '../components/InfluencerSpotlight'

const Home = () => {
  return (
    <div>
      <Hero />
      {/* <LatestCollection/> */}
      <Categories />
      <SubCategory />
      <BestSeller/>
      <InfluencerSpotlight />
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home

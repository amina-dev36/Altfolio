import React from 'react'
import Hero from '../components/Hero'
import TopCoins from '../components/TopCoins'
import TrendingCoin from '../components/TrendingCoin'
import GlobalMarketChart from '../components/GlobalMarketChart'
import CTASection from '../components/CTASection'
import HomeNewsSection from '../components/HomeNewsSection'

const Home = () => {
  return (
    <div className=" text-white overflow-hidden flex flex-col py-10">
      <Hero />
      <TopCoins />
      <TrendingCoin />
      <GlobalMarketChart />
      <HomeNewsSection />
      <CTASection />
    </div>
  )
}

export default Home

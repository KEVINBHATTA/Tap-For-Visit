import React from 'react'
import './Home.css';
import NavBar from '../components/Home/NavBar';
import HeroSection from '../components/Home/HeroSection';
import CardDesign from '../components/Home/CardDesign';
import ProfilePreview from '../components/Home/ProfilePreview';
import PricingSection from '../components/Home/PricingSection';
import FaqSection from '../components/Home/FaqSection';
import Footer from '../components/Home/Footer';


function Home() {
  return (
    <div className="Home">
    <NavBar/>
    <HeroSection/>
    <CardDesign/>
    <ProfilePreview/>
    <PricingSection/>
    <FaqSection/>
    <Footer/>



    </div>
  )
}

export default Home
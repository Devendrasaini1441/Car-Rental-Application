import React from 'react'
import HeroSection from './HeroSection'
import HeroCarousel from './HeroCarousel'
import AboutHome from '../Abouthome'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServicesGrid from './ServiceGrid'
import CarRentalFAQs from './CarRentalFAQS'
import ContactForm from './ContactForm'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <HeroSection />
        <br/><br/><br/>
        <ServicesGrid />
        <br/><br/><br/>
        <HeroCarousel />
        <br/><br/><br/>
        <ContactForm/>
        <AboutHome />
        <br/><br/><br/>
        <CarRentalFAQs />

        <Footer />

    </div>
  )
}

export default Home
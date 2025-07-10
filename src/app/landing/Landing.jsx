import React from "react";
import Header from "../../components/Header";
import HeroSection from "./HeroSection";
import About from "./About";
import heroBg from "../../assets/planeteducation.png";
import heroBgMobile from "../../assets/planeteducation-sm.png";
import WhyStudyAbroad from "./WhyStudyAbroad";
import ServicesTimeline from "./ServicesTimeline";
import UniversityShowcase from "./UniversityShowcase";
import Testimonials from "./Testimonials";

const Landing = () => {
  return (
    <>
      <div id="home" className="hero-bg">
        <Header />
        <HeroSection />
      </div>
      <About />
      <WhyStudyAbroad />
      <UniversityShowcase />
      <ServicesTimeline />
      <Testimonials />
    </>
  );
};

export default Landing;

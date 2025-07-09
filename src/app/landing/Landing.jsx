import React from "react";
import Header from "../../components/Header";
import HeroSection from "./HeroSection";
import About from "./About";
import heroBg from "../../assets/planet-banner.png";
import WhyStudyAbroad from "./WhyStudyAbroad";
import ServicesTimeline from "./ServicesTimeline";
import UniversityShowcase from "./UniversityShowcase";
import Testimonials from "./Testimonials";

const Landing = () => {
  return (
    <>
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
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

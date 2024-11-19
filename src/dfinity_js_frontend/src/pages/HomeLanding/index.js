import React from "react";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Hero from "../../components/common/Hero";
import Features from "../../components/common/Features";
import Testimonials from "../../components/common/Testimonials";
import HowItWorks from "../../components/common/HowItWorks";
import CTA from "../../components/common/CTA";
import JobCategories from "../../components/common/JobCategories";

const HomeLanding = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <JobCategories />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
};

export default HomeLanding;

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroBadge from '../components/HeroBadge';
import HeroTitle from '../components/HeroTitle';
import SocialLinks from '../components/SocialLinks';
import HeroImage from '../components/HeroImage';
import HireBadge from '../components/HireBadge';
import QuoteCard from '../components/QuoteCard';
import SkillTags from '../components/SkillTags';
import MarqueeSlider from '../components/MarqueeSlider';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import PortfolioSection from '../components/PortfolioSection';
import AwardsSection from '../components/AwardsSection';
import WorkProcessSection from '../components/WorkProcessSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogsSection from '../components/BlogsSection';
import ContactSection from '../components/ContactSection';
import FaqSection from '../components/FaqSection';
import FooterSection from '../components/FooterSection';
import ScrollReveal from '../components/ScrollReveal';
import './Home.css';

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div className={`home-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Subtle Background Grid Pattern */}
      <div className="bg-grid-overlay" />

      {/* Floating Navbar */}
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Container */}
      <main className="hero-main-container">
        {/* Top Centered Header Content */}
        <div className="hero-header-section">
          <HeroBadge />
          <HeroTitle />
        </div>

        {/* Main 3-Column Hero Section */}
        <div className="hero-content-grid">
          {/* Left Column: Social Links */}
          <div className="hero-left-column">
            <div className="left-column-top">
              <SocialLinks />
            </div>
          </div>

          {/* Center Column: Hero Portrait & Capsule Buttons */}
          <div className="hero-center-column">
            <HeroImage />
          </div>

          {/* Right Column: Hire Badge, Quote & Skill Pills */}
          <div className="hero-right-column">
            <div className="right-column-badge">
              <HireBadge />
            </div>
            <div className="right-column-quote">
              <QuoteCard />
            </div>
            <div className="right-column-tags">
              <SkillTags />
            </div>
          </div>
        </div>
      </main>

      {/* Full-width Endless Marquee Slider */}
      <MarqueeSlider />

      {/* Services Section ("How I Bring Ideas to Life") */}
      <ScrollReveal variant="fade-up">
        <ServicesSection />
      </ScrollReveal>

      {/* About Me Section ("Who is Snaha Chakraborty?") */}
      <ScrollReveal variant="fade-up">
        <AboutSection />
      </ScrollReveal>

      {/* Portfolio Section ("Let's Have a Look at My Portfolio") */}
      <ScrollReveal variant="fade-up">
        <PortfolioSection />
      </ScrollReveal>

      {/* Achievement Awards Section ("My Award-Winning Design Journey") */}
      <ScrollReveal variant="fade-up">
        <AwardsSection />
      </ScrollReveal>

      {/* Work Process Section ("The Way I Create Impactful Campaigns") */}
      <ScrollReveal variant="fade-up">
        <WorkProcessSection />
      </ScrollReveal>

      {/* Pricing Table Section ("My Pricing Model") */}
      <ScrollReveal variant="fade-up">
        <PricingSection />
      </ScrollReveal>

      {/* Testimonials Section ("What Clients Say About My Work") */}
      <ScrollReveal variant="fade-up">
        <TestimonialsSection />
      </ScrollReveal>

      {/* Latest Blogs Section ("Insights from My Blogs") */}
      <ScrollReveal variant="fade-up">
        <BlogsSection />
      </ScrollReveal>

      {/* Contact Me Section ("Let's Talk for Your Next Projects") */}
      <ScrollReveal variant="fade-up">
        <ContactSection />
      </ScrollReveal>

      {/* FAQs Section ("Question? Look here.") */}
      <ScrollReveal variant="fade-up">
        <FaqSection />
      </ScrollReveal>

      {/* Footer Section */}
      <ScrollReveal variant="fade-up">
        <FooterSection />
      </ScrollReveal>
    </div>
  );
}

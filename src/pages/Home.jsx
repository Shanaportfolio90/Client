import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroBadge from '../components/HeroBadge';
import HeroTitle from '../components/HeroTitle';
import SocialLinks from '../components/SocialLinks';
import ReviewsCard from '../components/ReviewsCard';
import HeroImage from '../components/HeroImage';
import HireBadge from '../components/HireBadge';
import QuoteCard from '../components/QuoteCard';
import SkillTags from '../components/SkillTags';
import MarqueeSlider from '../components/MarqueeSlider';
import ServicesSection from '../components/ServicesSection';
import AboutSection from '../components/AboutSection';
import ToolsSection from '../components/ToolsSection';
import PortfolioSection from '../components/PortfolioSection';
import AwardsSection from '../components/AwardsSection';
import WorkProcessSection from '../components/WorkProcessSection';
import PricingSection from '../components/PricingSection';
import TestimonialsSection from '../components/TestimonialsSection';
import BlogsSection from '../components/BlogsSection';
import ContactSection from '../components/ContactSection';
import FaqSection from '../components/FaqSection';
import FooterSection from '../components/FooterSection';
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
          {/* Left Column: Social Links & Reviews */}
          <div className="hero-left-column">
            <div className="left-column-top">
              <SocialLinks />
            </div>
            <div className="left-column-bottom">
              <ReviewsCard />
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
      <ServicesSection />

      {/* About Me Section ("Who is Snaha Chakraborty?") */}
      <AboutSection />

      {/* Favorite Tools Section ("Exploring the Tools Behind My Work") */}
      <ToolsSection />

      {/* Portfolio Section ("Let's Have a Look at My Portfolio") */}
      <PortfolioSection />

      {/* Achievement Awards Section ("My Award-Winning Design Journey") */}
      <AwardsSection />

      {/* Work Process Section ("The Way I Create Impactful Campaigns") */}
      <WorkProcessSection />

      {/* Pricing Table Section ("My Pricing Model") */}
      <PricingSection />

      {/* Testimonials Section ("What Clients Say About My Work") */}
      <TestimonialsSection />

      {/* Latest Blogs Section ("Insights from My Blogs") */}
      <BlogsSection />

      {/* Contact Me Section ("Let's Talk for Your Next Projects") */}
      <ContactSection />

      {/* FAQs Section ("Question? Look here.") */}
      <FaqSection />

      {/* Footer Section */}
      <FooterSection />
    </div>
  );
}
